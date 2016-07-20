const messageType = {
  EXECUTE_SCRIPT: 'EXECUTE_SCRIPT',
  RUN_AXS: 'RUN_AXS',
  AXS_COMPLETE: 'AXS_COMPLETE',
  HIGHLIGHT_WARNING: 'HIGHLIGHT_WARNING',
  UNHIGHLIGHT_WARNING: 'UNHIGHLIGHT_WARNING',
  HIGHLIGHT_REPORT: 'HIGHLIGHT_REPORT',
  UNHIGHLIGHT_REPORT: 'UNHIGHLIGHT_REPORT',
  TRACE_TAB_PATH: 'TRACE_TAB_PATH',
  PNG_TAB_PATH: 'PNG_TAB_PATH',
  CLEAR_AXS: 'CLEAR_AXS'
}

const auditDir = 'audit';
const tracerDir = 'tracer';

var devtools = null;

const devToolsListener = function(message, sender, sendResponse) {
  switch (message.type) {
    case messageType.EXECUTE_SCRIPT: {
      const { tabId, scriptToInject } = message.data;
      // Inject a content script into the identified tab
      chrome.tabs.executeScript(tabId, { file: scriptToInject });
      break;
    }
    case messageType.RUN_AXS: {
      const { tabId } = message.data;
      chrome.tabs.executeScript(tabId, { file: `${auditDir}/axs_testing.js` });
      chrome.tabs.executeScript(tabId, { file: `${auditDir}/run_axs.js` });
      break;
    }
    case messageType.CLEAR_AXS: {
      const { tabId } = message.data;
      chrome.tabs.executeScript(tabId, { file: `${auditDir}/clear_axs.js`})
      break;
    }
    case messageType.AXS_COMPLETE: {
      const { result, idToWarningsMap } = message.data;
      if (devtools) {
        devtools.postMessage({
          type: 'AXS_SHOW_RESULTS',
          data: {
            idToWarningsMap: idToWarningsMap
          }
        })
      }
      break;
    }
    case messageType.HIGHLIGHT_WARNING: {
        const { tabId, warningId } = message.data;
        chrome.tabs.sendMessage(tabId, {
          type: messageType.HIGHLIGHT_WARNING,
          data: {
            warningId: warningId
          }
        })
        break;
    }
    case messageType.UNHIGHLIGHT_WARNING: {
        const { tabId, warningId } = message.data;
        chrome.tabs.sendMessage(tabId, {
          type: messageType.UNHIGHLIGHT_WARNING,
          data: {
            warningId: warningId
          }
        })
        break;
    }
    case messageType.HIGHLIGHT_REPORT: {
      const { warningId } = message.data;
      if (devtools) {
        devtools.postMessage({
          type: messageType.HIGHLIGHT_REPORT,
          data: {
            warningId: warningId
          }
        })
      }
      break;
    }
    case messageType.UNHIGHLIGHT_REPORT: {
      const { warningId } = message.data;
      if (devtools) {
        devtools.postMessage({
          type: messageType.UNHIGHLIGHT_REPORT,
          data: {
            warningId: warningId
          }
        })
      }
      break;
    }
    case messageType.TRACE_TAB_PATH: {
      const { tabId } = message.data;
      chrome.tabs.executeScript(tabId, { file: `${tracerDir}/trace_tab_path.js` });
      break;
    }
    case messageType.PNG_TAB_PATH: {
      const { tabId } = message.data;
      chrome.tabs.executeScript(tabId, { file: `${tracerDir}/html2canvas.js` });
      chrome.tabs.executeScript(tabId, { file: `${tracerDir}/png_tab_path.js` });
      break;
    }
    default: {
      console.log(message);
      return null;
    }
  }
}

// might need to change this to be inside onConnect, and on devtools side
// pass the port to panel
chrome.runtime.onMessage.addListener(devToolsListener);
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // devToolsConnection.onMessage.addListener(devToolsListener);
  devtools = devToolsConnection;
  // assign the listener function to a variable so we can remove it later
  // add the listener
})
