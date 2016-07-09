// Utilities
function log(s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

var backgroundPageConnection = chrome.runtime.connect();
backgroundPageConnection.onMessage.addListener(function (message) {
   // Handle responses from the background page, if any
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
   tabId: chrome.devtools.inspectedWindow.tabId,
   scriptToInject: "content_script.js"
});

// Create panel
function createPanel() {
  chrome.devtools.panels.create('ChromeLens', '', 'panel.html', function(panel) {
    log(Date.now())
    panel.onShown.addListener(function(window) {
      log('panel open')
    });
    panel.onHidden.addListener(function() {
      log('panel hide')
    });
  })
}

createPanel();
