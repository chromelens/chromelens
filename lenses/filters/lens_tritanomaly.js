var iDiv = document.createElement('div');
iDiv.id = 'colorFilters';
iDiv.innerHTML = '<svg id="colorFilterSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full"> ' +
  '<filter id="tritanomaly"> ' +
  '<feColorMatrix type="matrix" values="0.967,0.033,0,0,0,0,0.733,0.267,0,0,0,0.183,0.817,0,0,0,0,0,1,0" in="SourceGraphic" /> ' +
  '</filter> ' +
  '</svg>';

document.body.appendChild(iDiv);
document.body.style.filter = "url(#tritanomaly)";
document.body.style.webkitFilter = "url(#tritanomaly)";
