console.log('content script loaded')

var iDiv = document.createElement('div');
iDiv.id = 'colorFilters';
iDiv.innerHTML = '<svg id="colorFilterSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full"> ' +
  '<filter id="protanopia"> ' +
  '<feColorMatrix type="matrix" values="0.567,0.433,0,0,0,0.558,0.442,0,0,0,0,0.242,0.758,0,0,0,0,0,1,0" in="SourceGraphic" /> ' +
  '</filter> ' +
  '</svg>';

document.body.appendChild(iDiv);
document.body.style.filter = "url(#protanopia)";
document.body.style.webkitFilter = "url(#protanopia)";
