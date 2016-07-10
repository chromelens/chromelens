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
    description: 'Absence of most colors.'
  },
  ACHROMATOPSIA: {
    name: 'Achromatopsia',
    file: 'lens_achromatopsia.js',
    stats: { },
    description: 'No colors at all.'
  },
  DEUTERANOMALY: {
    name: 'Deuteranomaly',
    file: 'lens_deuteranomaly.js',
    stats: {
      male: 5,
      female: 0.35
    },
    description: 'Low amounts of green color.'
  },
  DEUTERANOPIA: {
    name: 'Deuteranopia',
    file: 'lens_deuteranopia.js',
    stats: {
      male: 1,
      female: 0.1
    },
    description: 'No green color at all.'
  },
  EMPTY: {
    name: 'Normal vision',
    file: 'lens_empty.js',
    stats: { },
    description: 'Normal vision.'
  },
  FULL_BLINDNESS: {
    name: 'Full blindness',
    file: 'lens_fullblindness.js',
    stats: {
      count: '39 million (WHO)'
    },
    description: 'No vision at all.'
  },
  PARTIAL_BLINDNESS_MILD: {
    name: 'Partial blindness (mild)',
    file: 'lens_partialblindness_mild.js',
    stats: {
      count: '246 million (WHO)'
    },
    description: 'Limited vision (mild).'
  },
  PARTIAL_BLINDNESS_MEDIUM: {
    name: 'Partial blindness (medium)',
    file: 'lens_partialblindness_medium.js',
    stats: {
      count: '246 million (WHO)'
    },
    description: 'Limited vision (medium).'
  },
  PARTIAL_BLINDNESS_SERIOUS: {
    name: 'Partial blindness (serious)',
    file: 'lens_partialblindness_serious.js',
    stats: {
      count: '246 million (WHO)'
    },
    description: 'Limited vision (serious). Able to differentiate light vs dark.'
  },
  PROTANOMALY: {
    name: 'Protanomaly',
    file: 'lens_protanomaly.js',
    stats: {
      male: 1.08,
      female: 0.03
    },
    description: 'Low amounts of red color.',
  },
  PROTANOPIA: {
    name: 'Protanopia',
    file: 'lens_protanopia.js',
    stats: {
      male: 1.01,
      female: 0.02
    },
    description: 'No red color at all.'
  },
  TRITANOMALY: {
    name: 'Tritanomaly',
    file: 'lens_tritanomaly.js',
    stats: { },
    description: 'Low amounts of blue color.'
  },
  TRITANOPIA: {
    name: 'Tritanopia',
    file: 'lens_tritanopia.js',
    stats: { },
    description: 'No blue color at all.'
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
  const { description, stats } = lens;

  const lensDetail = document.getElementById('lensDetail');
  lensDetail.innerHTML = description;

  const statsDetail = document.getElementById('statsDetail');
  statsDetail.innerHTML = `
    Affects: <br />
      Population % - Male: ${stats.male || 'unknown'}, Female: ${stats.female || 'unknown'} <br />
      Population count: ${stats.count}
  `;

  // http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
  // http://www.color-blindness.com/
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

  // const stickyMouse = document.getElementById('stickymouseCbox');
  // stickyMouse.onchange = function(){
  //   if(this.checked)
  //   {
  //     chrome.runtime.sendMessage({
  //       type: messageType.EXECUTE_SCRIPT,
  //       data: {
  //         tabId: chrome.devtools.inspectedWindow.tabId,
  //         scriptToInject: 'stickymouse/magnify.js'
  //       }
  //     });
  //   }
  //   else
  //   {
  //     chrome.runtime.sendMessage({
  //       type: messageType.EXECUTE_SCRIPT,
  //       data: {
  //         tabId: chrome.devtools.inspectedWindow.tabId,
  //         scriptToInject: 'stickymouse/normalize.js'
  //       }
  //     });
  //   }
  // };

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
