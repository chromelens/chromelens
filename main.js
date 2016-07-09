/* global chrome */

// function createPanelIfReactLoaded() {
//   var reactPanel = null;
//   panel.onShown.addListener(function(window) {
//     // when the user switches to the panel, check for an elements tab
//     // selection
//     window.panel.getNewSelection();
//     reactPanel = window.panel;
//     reactPanel.resumeTransfer();
//   });
//   panel.onHidden.addListener(function() {
//     if (reactPanel) {
//       reactPanel.hideHighlight();
//       reactPanel.pauseTransfer();
//     }
//   });
// }

// Utilities
function log(s) {
  const string = JSON.stringify(s);
  chrome.devtools.inspectedWindow.eval('console.log(' + string + ')')
};

function createPanel() {
  chrome.devtools.panels.create('ChromeLens', '', 'panel.html', function(panel) {
    log(Date.now())
    log(chrome.devtools)
    panel.onShown.addListener(function(window) {
      log('window')
    });
    panel.onHidden.addListener(function() {
      log('hide')
    });
  })
}

// chrome.devtools.network.onNavigated.addListener(function() {
//   createPanel();
// });

createPanel();
