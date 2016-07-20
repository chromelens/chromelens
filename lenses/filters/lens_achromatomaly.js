var iDiv = document.createElement('div');
iDiv.id = 'colorFilters';
iDiv.innerHTML = '<svg id="colorFilterSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full"> ' +
  '<filter id="achromatomaly"> ' +
  '<feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0,0.163,0.775,0.062,0,0,0.163,0.320,0.516,0,0,0,0,0,1,0" in="SourceGraphic" /> ' +
  '</filter> ' +
  '</svg>';

document.body.appendChild(iDiv);
document.body.style.filter = "url(#achromatomaly)";
document.body.style.webkitFilter = "url(#achromatomaly)";
