function appendSVG(document) {

  /*
   'Normal':[1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Protanopia':[0.567,0.433,0,0,0, 0.558,0.442,0,0,0, 0,0.242,0.758,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Protanomaly':[0.817,0.183,0,0,0, 0.333,0.667,0,0,0, 0,0.125,0.875,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Deuteranopia':[0.625,0.375,0,0,0, 0.7,0.3,0,0,0, 0,0.3,0.7,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Deuteranomaly':[0.8,0.2,0,0,0, 0.258,0.742,0,0,0, 0,0.142,0.858,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Tritanopia':[0.95,0.05,0,0,0, 0,0.433,0.567,0,0, 0,0.475,0.525,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Tritanomaly':[0.967,0.033,0,0,0, 0,0.733,0.267,0,0, 0,0.183,0.817,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Achromatopsia':[0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0.299,0.587,0.114,0,0, 0,0,0,1,0, 0,0,0,0,1],
   'Achromatomaly':[0.618,0.320,0.062,0,0, 0.163,0.775,0.062,0,0, 0.163,0.320,0.516,0,0,0,0,0,1,0,0,0,0,0]
   */

  var svg = '<svg id="colorBlindSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full">  <filter id="tritanopia"> <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="tritanomaly"> <feColorMatrix type="matrix" values="0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="achromatopsia"> <feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="achromatomaly"> <feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> </svg>';

  var blockColorblindContent = document.getElementById("blockColorblindContent");
  if (blockColorblindContent !== undefined && blockColorblindContent !== null) {
    blockColorblindContent.parentNode.removeChild(blockColorblindContent);
  }

  var iDiv = document.createElement('div');
  iDiv.id = 'blockColorblindContent';
  iDiv.innerHTML = svg;
  document.getElementsByTagName('body')[0].appendChild(iDiv);
}

function changeColors(type) {
  appendSVG(document);
  revertColors(document);

  var css = 'html {' +
    'filter: url(#' + type + '); -webkit-filter: url(#' + type + '); -moz-filter: url(#' + type + '); -o-filter: url(#' + type + '); -ms-filter: url(#' + type + '); ' +
    '}';

  applyingStyle(document, css);
}

function revertColors(document) {
  var css = 'html { -webkit-filter: none; -moz-filter: none; -o-filter: none; -ms-filter: none; }';
  applyingStyle(document, css);
}

function applyingStyle(document, css) {

  var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}

function execute() {
  chrome.storage.sync.get('colorblindingValue', function (obj) {
    if (obj.colorblindingValue === null || obj.colorblindingValue === undefined) {
      obj.colorblindingValue = "normal";
      chrome.storage.sync.set({'colorblindingValue': obj.colorblindingValue});
    }
    changeColors(obj.colorblindingValue);
  });
}