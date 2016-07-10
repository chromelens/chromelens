console.log('content script loaded')

document.body.style.filter = "blur(2px)";
document.body.style.webkitFilter = "blur(2px)";

// z-index at upper bound of 32bit int
var styles = `
 background: rgba(50, 50, 50, 0.1);
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
