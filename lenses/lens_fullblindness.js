delete document.body.style.filter;
delete document.body.style.webkitFilter;

// z-index at upper bound of 32bit int
var styles = `
  background-color: black;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 2147483647;
`

var iDiv = document.createElement('div');
iDiv.id = 'colorFilters';
iDiv.innerHTML = `<div style="${styles}"></div>`;

document.body.appendChild(iDiv);
