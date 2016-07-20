delete document.body.style.filter;
delete document.body.style.webkitFilter;

var body = document.body,
    html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

var width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

var canvas = document.createElement("canvas");
canvas.id = 'chrome-lens-canvas';
canvas.style.pointerEvents = 'none';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.height = height;
canvas.width = width;
canvas.style.position = 'absolute';
canvas.style.zIndex = 2147483647;

var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0, 0);
if (document.activeElement !== document.body) {
  const { top: y, left: x } = getCoordinates(document.activeElement);
  ctx.lineTo(x, y);
  ctx.stroke();
}

document.body.appendChild(canvas);

document.body.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 9) {
      // Tab
      const { top: y, left: x } = getCoordinates(e.target);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }
};

function getCoordinates(elem) { 
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;
    var halfWidth = box.width / 2;
    var halfHeight = box.height / 2;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top + halfHeight), left: Math.round(left + halfWidth) };
}
