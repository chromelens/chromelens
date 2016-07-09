// Utilities
function log(...s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

const messageType = {
  EXECUTE_SCRIPT: 'EXECUTE_SCRIPT'
}

// Global state
let currentLens;

const changeLens = (lens) => {
  currentLens = lens;
  chrome.runtime.sendMessage({
    type: messageType.EXECUTE_SCRIPT,
    data: {
      tabId: chrome.devtools.inspectedWindow.tabId,
      scriptToInject: "lenses/" + lens + ".js"
    }
  });
}

const addEventListeners = () => {
  const lensSelector = document.getElementById('lensSelector');
  lensSelector.onchange = function(){
    const lens = this.options[this.selectedIndex].value;
    log(lens);
    changeLens(lens);
  };

  // Maintain lens across navigations
  chrome.devtools.network.onNavigated.addListener(() => changeLens(currentLens));

  const stickyMouse = document.getElementById('stickymouseCbox');
  stickyMouse.onchange = function(){
    log("Done");
    if(this.checked)
    {
      //Enable sticky mouse
    }
    else
    {
      //disable sticky mouse
    }
  };
}

addEventListeners();
