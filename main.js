const $canvas = document.getElementById('canvas');
const $decreaseBtn = document.getElementById('decrease');
const $increaseBtn = document.getElementById('increase');
const $sizeEl = document.getElementById('size');
const $colorEl = document.getElementById('color');
const $randomBtn = document.getElementById('random-color');
const $clearEl = document.getElementById('clear');

const ctx = $canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = $colorEl.value;
$colorEl.value = '#000000';
let x;
let y;
let isRandom = false;
let hue = 0;

$canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

$canvas.addEventListener('mouseup', (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

$canvas.addEventListener('mousemove', (e) => {
  if (!isPressed) {
    return;
  }
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);

    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;

    if (isRandom) {
      hue++;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      if (hue >= 360) {
        hue = 0;
      }
    }
  }
});

function drawCircle(x, y) {
  if (isRandom) {
    color = `hsl(${hue}, 100%, 50%)`;
  }
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  $sizeEl.textContent = size;
}

$colorEl.addEventListener('change', (e) => {
  isRandom = false;
  color = e.target.value;
  ctx.fillStyle = color;

  $randomBtn.classList.remove('active');
});

$decreaseBtn.addEventListener('click', () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

$increaseBtn.addEventListener('click', () => {
  size += 5;
  if (size > 40) {
    size = 40;
  }
  updateSizeOnScreen();
});

$randomBtn.addEventListener('click', () => {
  $randomBtn.classList.add('active');
  isRandom = true;
});

$clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
});
