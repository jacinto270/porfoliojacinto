// Página principal: retrato que sigue al puntero, proyectos destacados,
// muro de tarjetas con efecto spray y copiar correo.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Retrato por capas ---------- */
  const stage = document.getElementById('stage');
  const hint = document.getElementById('hint');
  const clamp = value => Math.max(-1, Math.min(1, value));
  let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0;

  if (reduceMotion) stage.querySelectorAll('.blink').forEach(layer => layer.classList.remove('blink'));

  // La animación solo se ejecuta mientras el retrato no ha llegado a su posición.
  const animate = () => {
    const ease = reduceMotion ? 1 : 0.12;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    stage.style.setProperty('--x', x.toFixed(4));
    stage.style.setProperty('--y', y.toFixed(4));
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.001 ? requestAnimationFrame(animate) : 0;
  };
  const start = () => { if (!frame) frame = requestAnimationFrame(animate); };

  const aim = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    targetX = clamp((clientX - (rect.left + rect.width / 2)) / (innerWidth / 2));
    targetY = clamp((clientY - (rect.top + rect.height / 2)) / (innerHeight / 2));
    start();
  };
  const reset = () => { targetX = 0; targetY = 0; start(); };

  addEventListener('pointermove', event => aim(event.clientX, event.clientY), { passive: true });
  addEventListener('pointerdown', event => aim(event.clientX, event.clientY), { passive: true });
  document.documentElement.addEventListener('pointerleave', reset);
  addEventListener('blur', reset);

  if (window.matchMedia('(pointer: coarse)').matches) {
    hint.textContent = 'Toca la pantalla y mi retrato mirará hacia ti.';
  }

  /* ---------- Proyectos destacados ---------- */
  const featuredContainer = document.getElementById('featuredProjects');
  const projects = window.portfolioProjects;
  if (featuredContainer && projects) {
    featuredContainer.replaceChildren(...projects.featured.map(name =>
      projects.createCard(projects.toProject(name), { compact: false })));
  }

  /* ---------- Textos de las tarjetas del muro ---------- */
  const cardContent = window.portfolioCardContent || {};
  const cards = [...document.querySelectorAll('.graffiti-card[data-card-id]')];
  cards.forEach(card => {
    const data = cardContent[card.dataset.cardId];
    if (!data) return;
    card.querySelector('[data-card-title]').textContent = data.title;
    card.querySelector('[data-card-description]').textContent = data.description;
  });

  /* ---------- Muro con efecto spray ---------- */
  const revealAllButton = document.getElementById('revealAll');

  const reveal = card => {
    card.classList.add('is-revealed');
    if (cards.every(item => item.classList.contains('is-revealed'))) revealAllButton.hidden = true;
  };

  const drawWall = (canvas, width, height) => {
    const scale = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext('2d');
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = '#aaa79d';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = '#77766e';
    context.lineWidth = 2;
    for (let row = 0, rowY = 0; rowY < height + 38; row++, rowY += 38) {
      context.beginPath();
      context.moveTo(0, rowY);
      context.lineTo(width, rowY);
      context.stroke();
      for (let brickX = row % 2 ? 0 : 45; brickX < width + 75; brickX += 90) {
        context.beginPath();
        context.moveTo(brickX, rowY);
        context.lineTo(brickX, rowY + 38);
        context.stroke();
      }
    }
    context.fillStyle = '#464642';
    context.font = `800 ${Math.max(25, Math.min(46, width * 0.1))}px "Bricolage Grotesque", Arial, sans-serif`;
    context.save();
    context.translate(width * 0.54, height * 0.58);
    context.rotate(-0.08);
    context.fillText('PINTA AQUÍ', -width * 0.35, 0, width * 0.7);
    context.restore();
    context.globalAlpha = 0.2;
    for (let i = 0; i < (width * height) / 130; i++) {
      context.fillStyle = i % 2 ? '#f4eee3' : '#555550';
      context.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
    context.globalAlpha = 1;
  };

  // Porcentaje de la pared ya pintado (muestreo en rejilla para que sea rápido).
  const clearedRatio = canvas => {
    const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const step = 16;
    let cleared = 0, total = 0;
    for (let row = 0; row < canvas.height; row += step) {
      for (let col = 0; col < canvas.width; col += step) {
        total++;
        if (data[(row * canvas.width + col) * 4 + 3] < 60) cleared++;
      }
    }
    return total ? cleared / total : 0;
  };

  cards.forEach(card => {
    const canvas = card.querySelector('.paint-surface');
    const context = canvas.getContext('2d');
    let painting = false;
    let previous = null;
    let lastWidth = 0;

    const paint = (event, first = false) => {
      const rect = canvas.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      context.save();
      context.globalCompositeOperation = 'destination-out';
      const radius = 27 + Math.random() * 15;
      const gradient = context.createRadialGradient(point.x, point.y, 2, point.x, point.y, radius);
      gradient.addColorStop(0, 'rgba(0,0,0,.96)');
      gradient.addColorStop(0.68, 'rgba(0,0,0,.72)');
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
          context.beginPath();
          context.arc(
            previous.x + (point.x - previous.x) * fraction + (Math.random() - 0.5) * 28,
            previous.y + (point.y - previous.y) * fraction + (Math.random() - 0.5) * 28,
            Math.random() * 3 + 1, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.restore();
      previous = point;
    };

    const stopPainting = () => {
      if (!painting) return;
      painting = false;
      previous = null;
      // Si ya se ha pintado casi la mitad, se descubre la tarjeta entera.
      if (clearedRatio(canvas) > 0.45) reveal(card);
    };

    canvas.addEventListener('pointerdown', event => {
      painting = true;
      previous = null;
      canvas.setPointerCapture(event.pointerId);
      paint(event, true);
    });
    canvas.addEventListener('pointermove', event => { if (painting) paint(event); });
    canvas.addEventListener('pointerup', stopPainting);
    canvas.addEventListener('pointercancel', stopPainting);
    card.querySelector('.reveal-button').addEventListener('click', () => reveal(card));

    // Redibuja la pared solo si cambia el ancho (evita borrar lo pintado al hacer scroll en móvil).
    new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (card.classList.contains('is-revealed') || Math.abs(width - lastWidth) < 1) return;
      lastWidth = width;
      drawWall(canvas, card.clientWidth, card.clientHeight || height);
    }).observe(card);
  });

  revealAllButton.addEventListener('click', () => cards.forEach(reveal));

  /* ---------- Copiar correo ---------- */
  const copyStatus = document.getElementById('copyStatus');
  let copyTimer = 0;
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        copyStatus.textContent = 'Correo copiado al portapapeles.';
      } catch {
        copyStatus.textContent = `No se pudo copiar. Mi correo es ${button.dataset.copy}`;
      }
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 4000);
    });
  });
})();
