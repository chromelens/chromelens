var devToolsListener = function(message, sender, sendResponse) {
  console.log('background message received');
  // Inject a content script into the identified tab
  chrome.tabs.executeScript(message.tabId, {
    file: message.scriptToInject
  });
}

chrome.runtime.onMessage.addListener(devToolsListener);
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  // add the listener
})
