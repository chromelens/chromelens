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

function indicate(el, rule_violated) {
  console.log(el.getBoundingClientRect());
  const {top, right, bottom, left, width, height, x, y} = el.getBoundingClientRect()
  const {code, heading, name, severity, url} = rule_violated;

  // el.style.backgroundColor = 'red';
  console.log(el + ' failed ' + rule_violated)

  const div = document.createElement('div');
  div.className = CHROME_LENS_WARNING_CLASS;

  div.style.left = left + 'px';
  div.style.top = top + 'px';
  div.style.width = width + 'px';
  div.style.height = height + 'px';
  const base = document.querySelector('#' + CHROME_LENS_BASE_ID);
  base.appendChild(div);
}

var run_result = axs.Audit.run();
initDom()

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

chrome.runtime.sendMessage({
  type: 'AXS_COMPLETE',
  data: {
    result: run_result
  }
})
