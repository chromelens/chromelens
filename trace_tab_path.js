console.log('tracing tab path');

delete document.body.style.filter;
delete document.body.style.webkitFilter;

var body = document.body,
    html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

var width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

console.log(height, width)


var canvas = document.createElement("canvas");
canvas.id = 'canvas';
canvas.style.pointerEvents = 'none';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.height = height + 'px'; 
canvas.style.width = width + 'px';
canvas.style.position = 'absolute';
canvas.style.zIndex = 2147483647;
canvas.style.border = '5px solid black';

var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(0, 0);
// ctx.lineTo(100, 100);
// ctx.lineTo(200, 100);
// ctx.stroke();

document.body.appendChild(canvas);

document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 9) {
      // Tab
      const { top: y, left: x } = getCoordinates(e.target);
      console.log(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
};

function getCoordinates(elem) { 
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}
