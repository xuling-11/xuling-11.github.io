const canvas = document.getElementById("fractalCanvas");
const ctx = canvas.getContext("2d");
const bg_toggleButton = document.getElementById('background-toggle'); /* 控制背景开关 */
const bg_icon = bg_toggleButton.querySelector("img"); // 获取按钮里的图片

let t = 0;
let animationId = null;
let backgroundEnabled = true; // 背景是否启用


// 此处0.7*size可以改变画框大小
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight);
  const maxCanvasSize = 600;

  canvas.width = Math.min(size * 0.7, maxCanvasSize);
  canvas.height = Math.min(size * 0.7, maxCanvasSize);

  canvas.style.width = `${size * 0.7}px`;
  canvas.style.height = `${size * 0.7}px`;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


function draw() {
  if (!backgroundEnabled) return; // 关闭背景时直接返回，不绘制

  const img = ctx.createImageData(canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x+=1) {
    for (let y = 0; y < canvas.height; y+=1) {

      let zx = (x - canvas.width / 2) / (0.5 * canvas.width) * 2;
      let zy = (y - canvas.height / 2) / (0.5 * canvas.width) * 2;

      let i = 0;
      const cX = Math.cos(t+1) * 0.7885;
      const cY = Math.sin(t+1) * 0.7885;

      while (zx*zx + zy*zy < 4 && i < 100) {
        let tmp = zx*zx - zy*zy + cX;
        zy = 2.0*zx*zy + cY;
        zx = tmp;
        i++;
      }

      const p = (x + y * canvas.width) * 4;
      img.data[p] = 128;
      img.data[p + 1] = 128;
      img.data[p + 2] = 128;
      img.data[p + 3] = Math.log(Math.log(i))*70;
    }
  }
  ctx.putImageData(img, 0, 0);
  t += 0.01;

  animationId = requestAnimationFrame(draw);
}


// 启动背景
function startBackground() {
  if (!backgroundEnabled) {
    backgroundEnabled = true;
    canvas.style.display = "block";
    draw();
    bg_icon.src = "assets/icon_file/fractal open.png"; // 切换为“开启”图标
  }
}

// 停止背景
function stopBackground() {
  if (backgroundEnabled) {
    backgroundEnabled = false;
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
    bg_icon.src = "assets/icon_file/fractal close.png"; // 切换为“关闭”图标
  }
}

// 按钮事件监听
bg_toggleButton.addEventListener("click", () => {
  if (backgroundEnabled) {
    stopBackground();
  } else {
    startBackground();
  }
});


draw();