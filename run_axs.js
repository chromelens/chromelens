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

  var style = document.createElement('style');
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
  if (severity === 'Severe') {
    el.innerText = severity;
  }
  else {
    el.innerText = severity;
  }
  el.appendChild(codeNode(code, url));
  return el;
}

function codeNode(code, url) {
  const el = document.createElement('a');
  el.href = url;
  el.innerText = code;
  return el;
}

function positionTooltip(tooltipText, el_top, el_left, el_height, el_right, el_width) {
  const {width, height} = tooltipText.getBoundingClientRect();
  console.log(height);
  console.log(el_top);
  if (height < el_top) {
    tooltipText.style.bottom = el_height + 'px';
  } else {
    tooltipText.style.top = el_height + 'px';
  }
  if (el_left + width > document.documentElement.clientWidth) {
    tooltipText.style.right = el_width + 'px';
  }
}

function indicate(el, rule_violated) {
  idToWarningsMap[id++] = {el: el, rule: rule_violated}

  // console.log(el.getBoundingClientRect());
  const {top, right, bottom, left, width, height, x, y} = el.getBoundingClientRect()
  const {code, heading, name, severity, url} = rule_violated;

  // el.style.backgroundColor = 'red';
  const tooltipText = document.createElement('div');
  tooltipText.className = 'tooltip-text';
  const link = document.createElement('a');
  link.href = url;
  // tooltip.innerText = severity + code + heading;
  tooltipText.appendChild(tooltipHeader(severity, code, url));
  tooltipText.appendChild(document.createTextNode(heading));

  const div = document.createElement('div');
  div.className = CHROME_LENS_WARNING_CLASS;
  div.classList.add('tooltip');

  div.style.left = left + 'px';
  div.style.top = top + 'px';
  div.style.width = width + 'px';
  div.style.height = height + 'px';
  div.id = 'chrome-lens-warning-' + id;
  div.appendChild(tooltipText);


  const base = document.querySelector('#' + CHROME_LENS_BASE_ID);
  base.appendChild(div);
  console.log(tooltipText.getBoundingClientRect());
  console.log(el);
  positionTooltip(tooltipText, top, left, height, right, width);
}

var run_result = axs.Audit.run();
initDom()
var idToWarningsMap = {}
var id = 0;

run_result.forEach(function(v) {
  if (v.result !== 'FAIL') {
    return;
  }

  v.elements.forEach(function(el) {
    const {top, right, bottom, left, width, height, x, y} = el.getBoundingClientRect()
    // if this isn't visible let's not warn about
    if (top < 0 || left < 0) return;

    indicate(el, v.rule);
  })
})
console.log(run_result);
console.log(idToWarningsMap);

chrome.runtime.sendMessage({
  type: 'AXS_COMPLETE',
  data: {
    result: run_result
  }
})
