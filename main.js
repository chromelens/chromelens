// Utilities
function log(...s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

// Create panel
function createPanel() {
  chrome.devtools.panels.create('ChromeLens', '', 'panel.html', function(panel) {
    var _window;
    log('Panel loaded', Date.now())
    var backgroundPageConnection = chrome.runtime.connect();
    backgroundPageConnection.onMessage.addListener(function (message) {
      // Handle responses from the background page, if any
      switch (message.type) {
        case 'AXS_SHOW_RESULTS': {
            const { idToWarningsMap } = message.data;
            if (_window) {
              _window.showAxsResults(idToWarningsMap);
            }
            break;
        }
        case 'HIGHLIGHT_REPORT': {
            const { warningId } = message.data;
            if (_window) {
              _window.highlightReportLine(warningId);
            }
            break;
        }
        case 'UNHIGHLIGHT_REPORT': {
            const { warningId } = message.data;
            if (_window) {
              _window.unhighlightReportLine(warningId);
            }
            break;
        }
      }
    });
    panel.onShown.addListener(function(window) {
      _window = window;
      log('panel open')
    });
    panel.onHidden.addListener(function() {
      log('panel hide')
    });
  })
}

createPanel();
