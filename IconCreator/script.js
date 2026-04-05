(function () {
  const fileInput = document.getElementById('fileInput');
  const blurRange = document.getElementById('blurRange');
  const blurValue = document.getElementById('blurValue');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const canvas = document.getElementById('previewCanvas');
  const ctx = canvas.getContext('2d');
  const TARGET_WIDTH = 1600;
  const TARGET_HEIGHT = 1000;
  let currentImage = null;
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
  function processAndRender() {
    if (!currentImage) return;
    const width = TARGET_WIDTH;
    const height = TARGET_HEIGHT;
    const blurPx = Number(blurRange.value) || 0;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.filter = `blur(${blurPx}px)`;
    ctx.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height, 0, 0, width, height);
    ctx.restore();
    ctx.filter = 'none';
    const scale = Math.min(width / currentImage.width, height / currentImage.height);
    const dw = currentImage.width * scale;
    const dh = currentImage.height * scale;
    const dx = Math.round((width - dw) / 2);
    const dy = Math.round((height - dh) / 2);
    ctx.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height, dx, dy, dw, dh);
    downloadBtn.disabled = false;
  }
})();
