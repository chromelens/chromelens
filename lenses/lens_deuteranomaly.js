console.log('content script loaded')

var iDiv = document.createElement('div');
iDiv.id = 'colorFilters';
iDiv.innerHTML = '<svg id="colorFilterSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full"> ' +
  '<filter id="deuteranopia"> ' +
  '<feColorMatrix type="matrix" values="0.8,0.2,0,0,0,0.258,0.742,0,0,0,0,0.142,0.858,0,0,0,0,0,1,0" in="SourceGraphic" /> ' +
  '</filter> ' +
  '</svg>';

document.body.appendChild(iDiv);
document.body.style.filter = "url(#deuteranopia)";
document.body.style.webkitFilter = "url(#deuteranopia)";