var run_result = axs.Audit.run();
STYLE = ''

function addStyle() {
  var style = document.createElement('style');
  style.id = 'chrome_lens_style';
  style.innerHTML = STYLE
  cvox.DomUtil.addNodeToHead(style, style.id);
}

function buildBase() {
  const div = document.createElement('div');
  document.body.appendChild(div);
}

function indicate(el, rule_violated) {
    const {top, right, bottom, left, width, height, x, y} = el.getBoundingClientRect()
    const {code, heading, name, severity, url} = rule_violated;

    el.style.backgroundColor = 'red';
    console.log(el + ' failed ' + rule_violated)

    // div = document.createElement('div');

    // div.style.position = 'absolute';
    // div.style.left = left;
    // div.style.width = width;
    // div.style.height = height;
    // div.style.borderWidth = '10px';
    // div.style.borderColor = 'red';
}

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
