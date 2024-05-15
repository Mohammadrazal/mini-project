const socket = io();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  const { offsetX, offsetY } = e;
  socket.emit('draw', { lastX, lastY, offsetX, offsetY });
  drawLine(lastX, lastY, offsetX, offsetY);
  [lastX, lastY] = [offsetX, offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

socket.on('draw', ({ lastX, lastY, offsetX, offsetY }) => {
  drawLine(lastX, lastY, offsetX, offsetY);
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}
