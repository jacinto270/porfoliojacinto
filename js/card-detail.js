(() => {
  const sectionId = new URLSearchParams(window.location.search).get('seccion');
  const data = sectionId && window.portfolioCardContent[sectionId];
  const title = document.getElementById('detailTitle');
  const content = document.getElementById('detailContent');

  if (!data) {
    title.textContent = 'Información no disponible';
    content.textContent = 'No se encontró la información solicitada.';
    return;
  }

  document.title = `${data.title} — Jacinto Juarez Rodriguez`;
  title.textContent = data.title;
  content.textContent = data.details;
})();
