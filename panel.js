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
    const lens = this.options[this.selectedIndex].value;
    // Relay the tab ID to the background page
    chrome.runtime.sendMessage({
      tabId: chrome.devtools.inspectedWindow.tabId,
      scriptToInject: "lenses/" + lens + ".js"
    });
  };
}

log('panel')
addEventListeners();
