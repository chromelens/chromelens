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

function createPanel() {
  chrome.devtools.panels.create('ChromeLens', '', 'panel.html', function(panel) {
    panel.onShown.addListener(function(window) {
      console.log(window);
    });
    panel.onHidden.addListener(function() {
      console.log('hidden');
    });
  })
}

// chrome.devtools.network.onNavigated.addListener(function() {
//   createPanel();
// });

createPanel();
