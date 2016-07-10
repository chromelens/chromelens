// Utilities
function log(...s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

const messageType = {
  EXECUTE_SCRIPT: 'EXECUTE_SCRIPT',
  RUN_AXS: 'RUN_AXS'
}

const lensType = {
  ACHROMATOMALY: {
    name: 'Achromatomaly',
    file: 'lens_achromatomaly.js',
    stats: { },
    description: ''
  },
  ACHROMATOPSIA: {
    name: 'Achromatopsia',
    file: 'lens_achromatopsia.js',
    stats: { },
    description: ''
  },
  DEUTERANOMALY: {
    name: 'Deuteranomaly',
    file: 'lens_deuteranomaly.js',
    stats: { },
    description: ''
  },
  DEUTERANOPIA: {
    name: 'Deuteranopia',
    file: 'lens_deuteranopia.js',
    stats: { },
    description: ''
  },
  EMPTY: {
    name: 'Normal vision',
    file: 'lens_empty.js',
    stats: { },
    description: ''
  },
  FULL_BLINDNESS: {
    name: 'Full blindness',
    file: 'lens_fullblindness.js',
    stats: { },
    description: ''
  },
  PARTIAL_BLINDNESS: {
    name: 'Partial blindness',
    file: 'lens_partialblindness.js',
    stats: { },
    description: ''
  },
  PROTANOMALY: {
    name: 'Protanomaly',
    file: 'lens_protanomaly.js',
    stats: { },
    description: ''
  },
  PROTANOPIA: {
    name: 'Protanopia',
    file: 'lens_protanopia.js',
    stats: { },
    description: ''
  },
  TRITANOMALY: {
    name: 'Tritanomaly',
    file: 'lens_tritanomaly.js',
    stats: { },
    description: ''
  },
  TRITANOPIA: {
    name: 'Tritanopia',
    file: 'lens_tritanopia.js',
    stats: { },
    description: ''
  }
}

// Global state
let currentLens;
const lensDir = 'lenses/';

const changeLens = (lens) => {
  currentLens = lens;
  chrome.runtime.sendMessage({
    type: messageType.EXECUTE_SCRIPT,
    data: {
      tabId: chrome.devtools.inspectedWindow.tabId,
      scriptToInject: lensDir + lens.file
    }
  });
}

const addEventListeners = () => {
  const lensSelector = document.getElementById('lensSelector');
  lensSelector.onchange = function(){
    const lensName = this.options[this.selectedIndex].value;
    const lens = lensType[lensName.toUpperCase()];
    changeLens(lens);
  };

  // Maintain lens across navigations
  chrome.devtools.network.onNavigated.addListener(() => changeLens(currentLens));

  const stickyMouse = document.getElementById('stickymouseCbox');
  stickyMouse.onchange = function(){
    if(this.checked)
    {
      chrome.runtime.sendMessage({
        type: messageType.EXECUTE_SCRIPT,
        data: {
          tabId: chrome.devtools.inspectedWindow.tabId,
          scriptToInject: 'stickymouse/magnify.js'
        }
      });
    }
    else
    {
      chrome.runtime.sendMessage({
        type: messageType.EXECUTE_SCRIPT,
        data: {
          tabId: chrome.devtools.inspectedWindow.tabId,
          scriptToInject: 'stickymouse/normalize.js'
        }
      });
    }
  };

  const runAxsButton = document.getElementById('runAxs');
  runAxsButton.onclick = function() {
    chrome.runtime.sendMessage({
      type: messageType.RUN_AXS,
      data: {
        tabId: chrome.devtools.inspectedWindow.tabId
      }
    })
  }
}

addEventListeners();
