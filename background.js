const messageType = {
  EXECUTE_SCRIPT: 'EXECUTE_SCRIPT',
  RUN_AXS: 'RUN_AXS',
  AXS_COMPLETE: 'AXS_COMPLETE'
}

const AXS_TESTING = 'axs_testing.js'

const devToolsListener = function(message, sender, sendResponse) {
  console.log('background message received');
  switch (message.type) {
    case messageType.EXECUTE_SCRIPT: {
      const { tabId, scriptToInject } = message.data;
      // Inject a content script into the identified tab
      chrome.tabs.executeScript(tabId, { file: scriptToInject });
    }
    case messageType.RUN_AXS: {
      const { tabId } = message.data;
      chrome.tabs.executeScript(tabId, { file: AXS_TESTING });
      chrome.tabs.executeScript(tabId, { file: 'run_axs.js' });
    }
    case messageType.AXS_COMPLETE: {
        const { result } = message.data;
    }
    default: {
      return null;
    }
}

chrome.runtime.onMessage.addListener(devToolsListener);
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  // add the listener
})
