var iDiv = document.createElement('div');
iDiv.id = 'chromelens-colorFilters';
iDiv.innerHTML = '<svg style="display: none" version="1.1" xmlns="http://www.w3.org/2000/svg" baseProfile="full"> ' +
  '<filter id="tritanopia"> ' +
  '<feColorMatrix type="matrix" values="0.95,0.05,0,0,0,0,0.433,0.567,0,0,0,0.475,0.525,0,0,0,0,0,1,0" in="SourceGraphic" /> ' +
  '</filter> ' +
  '</svg>';

document.body.appendChild(iDiv);
document.body.style.filter = "url(#tritanopia)";
document.body.style.webkitFilter = "url(#tritanopia)";
