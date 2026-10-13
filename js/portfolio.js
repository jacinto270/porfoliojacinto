(() => {
  const stage = document.getElementById('stage');
  const layers = [...stage.querySelectorAll('.layer')];
  const clamp = v => Math.max(-1, Math.min(1, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tx = 0, ty = 0, x = 0, y = 0;
  const hint = document.getElementById('hint');
  if (reduce) layers.forEach(layer => layer.classList.remove('blink'));
  const aim = (cx, cy) => {
    const r = stage.getBoundingClientRect();
    tx = clamp((cx - (r.left + r.width / 2)) / (innerWidth / 2));
    ty = clamp((cy - (r.top + r.height / 2)) / (innerHeight / 2));
    hint.textContent = 'Tu retrato sigue el movimiento del cursor.';
  };
  addEventListener('pointermove', e => aim(e.clientX, e.clientY), { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    tx = 0;
    ty = 0;
    hint.textContent = 'Mueve el cursor para que el retrato te siga.';
  });
  addEventListener('blur', () => { tx = 0; ty = 0; });
  const ease = reduce ? 1 : 0.12;
  (function loop() {
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    stage.style.setProperty('--x', x.toFixed(4));
    stage.style.setProperty('--y', y.toFixed(4));
    requestAnimationFrame(loop);
  })();

  const cardContent = window.portfolioCardContent;
  const cards = [...document.querySelectorAll('.graffiti-card[data-card-id]')];
  cards.forEach(card => {
    const data = cardContent[card.dataset.cardId];
    if (data) {
      card.querySelector('[data-card-title]').textContent = data.title;
      card.querySelector('[data-card-description]').textContent = data.description;
    }
  });

  const drawWall = canvas => {
    const card = canvas.closest('.graffiti-card');
    const rect = card.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext('2d');
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = '#aaa79d';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = '#77766e';
    context.lineWidth = 2;
    for (let row = 0, yPos = 0; yPos < height + 38; row++, yPos += 38) {
      context.beginPath();
      context.moveTo(0, yPos);
      context.lineTo(width, yPos);
      context.stroke();
      const offset = row % 2 ? 0 : 45;
      for (let xPos = offset; xPos < width + 75; xPos += 90) {
        context.beginPath();
        context.moveTo(xPos, yPos);
        context.lineTo(xPos, yPos + 38);
        context.stroke();
      }
    }
    context.fillStyle = '#464642';
    context.font = `800 ${Math.max(25, Math.min(46, width * .1))}px Arial`;
    context.save();
    context.translate(width * .54, height * .58);
    context.rotate(-.08);
    context.fillText('PINTA AQUÍ', -width * .35, 0, width * .7);
    context.restore();
    context.globalAlpha = .2;
    for (let i = 0; i < width * height / 130; i++) {
      context.fillStyle = i % 2 ? '#f4eee3' : '#555550';
      context.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    context.globalAlpha = 1;
  };

  const canvases = [...document.querySelectorAll('.paint-surface')];
  canvases.forEach(canvas => {
    const card = canvas.closest('.graffiti-card');
    const context = canvas.getContext('2d');
    let painting = false;
    let previous = null;
    const paint = (event, first = false) => {
      const rect = canvas.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      context.save();
      context.globalCompositeOperation = 'destination-out';
      const radius = 27 + Math.random() * 15;
      const gradient = context.createRadialGradient(point.x, point.y, 2, point.x, point.y, radius);
      gradient.addColorStop(0, 'rgba(0,0,0,.96)');
      gradient.addColorStop(.68, 'rgba(0,0,0,.72)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
      if (previous && !first) {
        const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
        const steps = Math.ceil(distance / 9);
        for (let step = 0; step < steps; step++) {
          const fraction = step / steps;
          const dotX = previous.x + (point.x - previous.x) * fraction + (Math.random() - .5) * 28;
          const dotY = previous.y + (point.y - previous.y) * fraction + (Math.random() - .5) * 28;
          context.beginPath();
          context.arc(dotX, dotY, Math.random() * 3 + 1, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.restore();
      previous = point;
    };
    canvas.addEventListener('pointerdown', event => {
      painting = true;
      previous = null;
      canvas.setPointerCapture(event.pointerId);
      paint(event, true);
    });
    canvas.addEventListener('pointermove', event => {
      if (painting) paint(event);
    });
    const stopPainting = () => { painting = false; previous = null; };
    canvas.addEventListener('pointerup', stopPainting);
    canvas.addEventListener('pointercancel', stopPainting);
    card.querySelector('.reveal-button').addEventListener('click', () => {
      card.classList.add('is-revealed');
    });
  });
  const resizeObserver = new ResizeObserver(() => {
    canvases.forEach(canvas => {
      if (!canvas.closest('.graffiti-card').classList.contains('is-revealed')) drawWall(canvas);
    });
  });
  canvases.forEach(canvas => resizeObserver.observe(canvas.closest('.graffiti-card')));
})();
