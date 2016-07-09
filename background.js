const messageType = {
  EXECUTE_SCRIPT: 'EXECUTE_SCRIPT'
}

const devToolsListener = function(message, sender, sendResponse) {
  console.log('background message received');
  switch (message.type) {
    case messageType.EXECUTE_SCRIPT: {
      const { tabId, scriptToInject } = message.data;
      // Inject a content script into the identified tab
      chrome.tabs.executeScript(tabId, { file: scriptToInject });
    }
    default:
      return null;
  }
}

chrome.runtime.onMessage.addListener(devToolsListener);
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  // add the listener
})
