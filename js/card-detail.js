// detalle.html: muestra la sección indicada en la URL (?seccion=formacion, experiencia, ...).
(() => {
  const content = window.portfolioCardContent || {};
  const sectionId = new URLSearchParams(window.location.search).get('seccion');
  const data = sectionId && Object.hasOwn(content, sectionId) ? content[sectionId] : null;

  const label = document.getElementById('detailLabel');
  const title = document.getElementById('detailTitle');
  const body = document.getElementById('detailContent');
  const nav = document.getElementById('detailNav');

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const link = (className, text, href) => {
    const anchor = element('a', className, text);
    anchor.href = href;
    return anchor;
  };

  if (!data) {
    title.textContent = 'Sección no encontrada';
    body.append(element('p', '', 'La sección que buscas no existe o ha cambiado de dirección.'));
  } else {
    document.title = `${data.title} — Jacinto Juárez Rodríguez`;
    label.textContent = data.label || 'Sobre mí';
    title.textContent = data.title;
    (data.paragraphs || []).forEach(text => body.append(element('p', '', text)));
    const appendList = (heading, items) => {
      if (!items || !items.length) return;
      if (heading) body.append(element('h2', '', heading));
      const list = element('ul');
      items.forEach(item => list.append(element('li', '', item)));
      body.append(list);
    };
    appendList(data.listTitle, data.list);
    appendList(data.extraTitle, data.extra);
  }

  // Enlace al CV en todas las secciones.
  const cvLink = link('text-link', 'Descargar mi CV completo (PDF) ↓', 'cv/CV-Jacinto-Juarez-Rodriguez.pdf');
  cvLink.setAttribute('download', 'CV-Jacinto-Juarez-Rodriguez.pdf');
  const cvParagraph = element('p');
  cvParagraph.append(cvLink);
  body.append(cvParagraph);

  // Navegación: volver al muro y saltar a las demás secciones.
  nav.append(link('button button-primary', '← Volver al portfolio', 'index.html#sobre-mi'));
  Object.entries(content)
    .filter(([id]) => id !== sectionId)
    .forEach(([id, item]) => nav.append(link('button button-ghost', item.title, `detalle.html?seccion=${encodeURIComponent(id)}`)));
})();
