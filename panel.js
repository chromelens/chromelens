// Utilities
//
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
    description: 'Absence of most colors'
  },
  ACHROMATOPSIA: {
    name: 'Achromatopsia',
    file: 'lens_achromatopsia.js',
    stats: { },
    description: 'No colors at all'
  },
  DEUTERANOMALY: {
    name: 'Deuteranomaly',
    file: 'lens_deuteranomaly.js',
    stats: { },
    description: 'Low amounts of green color'
  },
  DEUTERANOPIA: {
    name: 'Deuteranopia',
    file: 'lens_deuteranopia.js',
    stats: { },
    description: 'No green color at all'
  },
  EMPTY: {
    name: 'Normal vision',
    file: 'lens_empty.js',
    stats: { },
    description: 'Normal vision'
  },
  FULL_BLINDNESS: {
    name: 'Full blindness',
    file: 'lens_fullblindness.js',
    stats: { },
    description: 'No vision at all'
  },
  PARTIAL_BLINDNESS: {
    name: 'Partial blindness',
    file: 'lens_partialblindness.js',
    stats: { },
    description: 'Limited vision'
  },
  PROTANOMALY: {
    name: 'Protanomaly',
    file: 'lens_protanomaly.js',
    stats: { },
    description: 'Low amounts of red color'
  },
  PROTANOPIA: {
    name: 'Protanopia',
    file: 'lens_protanopia.js',
    stats: { },
    description: 'No red color at all'
  },
  TRITANOMALY: {
    name: 'Tritanomaly',
    file: 'lens_tritanomaly.js',
    stats: { },
    description: 'Low amounts of blue'
  },
  TRITANOPIA: {
    name: 'Tritanopia',
    file: 'lens_tritanopia.js',
    stats: { },
    description: 'No blue color at all'
  }
}

// Global state
const lensDir = 'lenses/';

const changeLens = (lens) => {
  // Remove any lens div
  chrome.runtime.sendMessage({
    type: messageType.EXECUTE_SCRIPT,
    data: {
      tabId: chrome.devtools.inspectedWindow.tabId,
      scriptToInject: lensDir + 'reset.js'
    }
  });
  chrome.runtime.sendMessage({
    type: messageType.EXECUTE_SCRIPT,
    data: {
      tabId: chrome.devtools.inspectedWindow.tabId,
      scriptToInject: lensDir + lens.file
    }
  });
  const lensDetail = document.getElementById('lensDetail');
  const { description } = lens;
  lensDetail.innerHTML = description;
}

const addEventListeners = () => {
  const lensSelector = document.getElementById('lensSelector');
  const getSelectedLens = () => {
    const { options, selectedIndex } = lensSelector;
    const { value } = options[selectedIndex];
    const lens = lensType[value.toUpperCase()];
    log(lens);
    return lens;
  }
  const setSelectedLens = () => lensEnabledCheckbox.checked ?
    changeLens(getSelectedLens()) : changeLens(lensType.EMPTY);

  lensSelector.onchange = setSelectedLens;

  const lensEnabledCheckbox = document.getElementById('lensEnabledCheckbox');
  lensEnabledCheckbox.onclick = function() {
    lensSelector.disabled = !this.checked;
    setSelectedLens();
  }

  // Maintain lens across navigations
  chrome.devtools.network.onNavigated.addListener(setSelectedLens);

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
