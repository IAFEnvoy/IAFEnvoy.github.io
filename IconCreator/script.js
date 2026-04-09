(function () {
  const fileInput = document.getElementById('fileInput');
  const blurRange = document.getElementById('blurRange');
  const blurValue = document.getElementById('blurValue');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');
  const bgColorInput = document.getElementById('bgColor');
  const autoBgChk = document.getElementById('autoBg');
  const leftColorInput = document.getElementById('leftColor');
  const rightColorInput = document.getElementById('rightColor');
  const TARGET_WIDTH = 1600;
  const TARGET_HEIGHT = 1000;
  let currentImage = null;

  blurValue.textContent = blurRange.value;
  bgColorInput.disabled = autoBgChk.checked;

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      currentImage = await loadImageFromFile(file);
      generateBtn.disabled = false;
      processAndRender();
    } catch (err) {
      alert('无法加载图片');
    }
  });

  blurRange.addEventListener('input', () => {
    blurValue.textContent = blurRange.value;
    if (currentImage) processAndRender();
  });

  document.querySelectorAll('input[name="mode"]').forEach(r => {
    r.addEventListener('change', () => {
      const mode = document.querySelector('input[name="mode"]:checked').value;
      blurRange.disabled = mode !== 'blur';
      if (currentImage) processAndRender();
    });
  });

  autoBgChk.addEventListener('change', () => {
    bgColorInput.disabled = autoBgChk.checked;
    if (currentImage) processAndRender();
  });

  bgColorInput.addEventListener('input', () => { if (currentImage) processAndRender(); });
  leftColorInput.addEventListener('input', () => { if (currentImage) processAndRender(); });
  rightColorInput.addEventListener('input', () => { if (currentImage) processAndRender(); });

  generateBtn.addEventListener('click', () => {
    if (currentImage) processAndRender();
  });

  downloadBtn.addEventListener('click', () => {
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'photo-16x10.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.92);
  });

  function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
      img.src = url;
    });
  }

  function sampleAverageColor(img) {
    const w = 16;
    const h = 16;
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
    const data = octx.getImageData(0, 0, w, h).data;
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function processAndRender() {
    if (!currentImage) return;
    const width = TARGET_WIDTH;
    const height = TARGET_HEIGHT;
    const scale = Math.min(width / currentImage.width, height / currentImage.height);
    const dw = Math.round(currentImage.width * scale);
    const dh = Math.round(currentImage.height * scale);
    const dx = Math.round((width - dw) / 2);
    const dy = Math.round((height - dh) / 2);

    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    // 背景颜色始终填充在最底层
    let bgColor = bgColorInput.value;
    if (autoBgChk.checked) {
      bgColor = sampleAverageColor(currentImage);
    }
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const mode = document.querySelector('input[name="mode"]:checked')?.value || 'blur';

    if (mode === 'blur') {
      const blurPx = Number(blurRange.value) || 0;
      ctx.save();
      ctx.filter = `blur(${blurPx}px)`;
      ctx.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height, 0, 0, width, height);
      ctx.restore();
    } else {
      // 纯色模式：只在左右空白时使用左右颜色填充（上下空白由背景色承担）
      if (dx > 0) {
        ctx.fillStyle = leftColorInput.value;
        ctx.fillRect(0, 0, dx, height);
        ctx.fillStyle = rightColorInput.value;
        ctx.fillRect(dx + dw, 0, width - (dx + dw), height);
      }
    }

    // 绘制居中缩放后的原图
    ctx.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height, dx, dy, dw, dh);

    downloadBtn.disabled = false;
  }
})();
