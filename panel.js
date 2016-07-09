// Utilities
function log(s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

const str = "hello world";
log(str);

function addEventListeners() {
  const lensSelector = document.getElementById('lensSelector');
  lensSelector.onchange = function(){
    log(this.options[this.selectedIndex].value);
  };
}

log('panel')
addEventListeners();
