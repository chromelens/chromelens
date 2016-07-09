chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = function(message, sender, sendResponse) {
    // Inject a content script into the identified tab
  }
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  chrome.tabs.executeScript(null,
      { file: 'content_script.js' });

  // chrome.tabs.executeScript(message.tabId,
  //     { file: message.scriptToInject });

  devToolsConnection.onDisconnect.addListener(function() {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
})
