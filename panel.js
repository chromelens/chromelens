// Utilities
function log(...s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

const messageType = {
  EXECUTE_SCRIPT: 'EXECUTE_SCRIPT'
}

function addEventListeners() {
  const lensSelector = document.getElementById('lensSelector');
  lensSelector.onchange = function(){
    const lens = this.options[this.selectedIndex].value;

    log(lens);

    chrome.runtime.sendMessage({
      type: messageType.EXECUTE_SCRIPT,
      data: {
        tabId: chrome.devtools.inspectedWindow.tabId,
        scriptToInject: "lenses/" + lens + ".js"
      }
    });
  };
}

addEventListeners();
