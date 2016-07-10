var STYLE =
  '#chrome-lens-base {' +
  '  position: absolute;' +
  '  top: 0;' +
  '  left: 0;' +
  '  z-index: 999999;' +
  '}' +
  '.chrome-lens-warning {' +
  '  position: absolute;' +
  '  box-shadow: 0 0 4px 4px #f7983a;' +
  '  border-radius: 2px;' +
  '}' +
  '.tooltip .tooltip-text {' +
  '  visibility: hidden;' +
  '  display: inline-block;' +
  '  background-color: black;' +
  '  color: #fff;' +
  '  position: absolute;' +
  '  max-width: 300px;' +
  '  padding: 10px 5px;' +
  '  border-radius: 2px;' +
  '}' +
  '.tooltip:hover .tooltip-text {' +
  '  visibility: visible;' +
  '}';

var CHROME_LENS_STYLE_ID = 'chrome-lens-style'
var CHROME_LENS_BASE_ID = 'chrome-lens-base'
var CHROME_LENS_WARNING_CLASS = 'chrome-lens-warning'

function initDom() {
  if (document.querySelector('#' + CHROME_LENS_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = CHROME_LENS_STYLE_ID;
  style.innerHTML = STYLE;
  document.head.appendChild(style)

  if (document.querySelector('#' + CHROME_LENS_BASE_ID)) return;

  const div = document.createElement('div');
  div.id = CHROME_LENS_BASE_ID;
  document.body.appendChild(div);
}

function tooltipHeader(severity, code, url) {
  const el = document.createElement('p');
  const s = document.createElement('span');
  if (severity === 'Severe') {
    s.innerText = severity;
  }
  else {
    s.innerText = severity;
  }

  const codeLink = document.createElement('a');
  codeLink.href = url;
  codeLink.innerText = code;
  codeLink.target = '_blank';

  el.appendChild(s);
  el.appendChild(codeLink);
  return el;
}

function positionTooltip(tooltipText, el_top, el_left, el_height) {
  const {width, height} = tooltipText.getBoundingClientRect();
  if (height < el_top) {
    // tooltip cannot fit above, make it below
    tooltipText.style.bottom = el_height + 'px';
  } else {
    // tooltip goes above
    tooltipText.style.top = el_height + 'px';
  }
  if (el_left + width > document.documentElement.clientWidth) {
    // tooltip is wider than the el, right align el and tooltip
    tooltipText.style.right = 0 + 'px';
  }
}

function tooltipTextNode(rule_violated) {
  const {code, heading, name, severity, url} = rule_violated;
  const tooltipText = document.createElement('div');
  tooltipText.className = 'tooltip-text';
  tooltipText.appendChild(tooltipHeader(severity, code, url));
  tooltipText.appendChild(document.createTextNode(heading));
  return tooltipText;
}

function tooltipNode(offendingEl) {
  const {top, right, bottom, left, width, height, x, y} = offendingEl.getBoundingClientRect()
  const div = document.createElement('div');
  div.className = CHROME_LENS_WARNING_CLASS;
  div.classList.add('tooltip');
  div.style.left = left + 'px';
  div.style.top = top + 'px';
  div.style.width = width + 'px';
  div.style.height = height + 'px';
  // this id will be useful if we want to reference specific warnings emitted
  div.id = 'chrome-lens-warning-' + id;
  return div;
}

function highlightElementForRuleViolation(el, rule_violated) {
  idToWarningsMap[id++] = {el: el, rule: rule_violated}

  const {top, right, bottom, left, width, height, x, y} = el.getBoundingClientRect()

  // if this isn't visible let's not warn about
  if (top < 0 || left < 0) return;

  const tooltipText = tooltipTextNode(rule_violated);
  const toolTip = tooltipNode(el);
  toolTip.appendChild(tooltipText);

  const base = document.querySelector('#' + CHROME_LENS_BASE_ID);
  base.appendChild(toolTip);
  // we can only position after we append, because tooltipText has no
  // bounding client rect before it gets added to the DOM
  positionTooltip(tooltipText, top, left, height);
}

var run_result = axs.Audit.run();
initDom()
var idToWarningsMap = {}
var id = 0;

run_result.forEach(function(v) {
  // we only want to highlight failures
  if (v.result !== 'FAIL') { return; }

  v.elements.forEach(function(el) {
    highlightElementForRuleViolation(el, v.rule);
  })
})
// console.log(run_result);
// console.log(idToWarningsMap);

chrome.runtime.sendMessage({
  type: 'AXS_COMPLETE',
  data: {
    result: run_result
  }
})
