(() => {
  const githubApi = 'https://api.github.com/users/jacinto270/repos?sort=updated&per_page=100';
  const list = document.getElementById('projectsList');
  const status = document.getElementById('projectsStatus');

  // Personaliza aquí el orden, título, descripción, imagen y URL pública de cada proyecto.
  // Sustituye image por una ruta propia, por ejemplo "images/mi-proyecto.jpg".
  // Rellena netlifyUrl solo cuando el proyecto tenga una demo publicada en Netlify.
  const projectOrder = [
    'paginaparfum2',
    'demoviedb',
    'mi-lista-de-canciones',
    'adolescente',
    'galletasvg',
    'ejerciciosjava',
    'proyectofinal',
    'formulario-t3-practica',
    'porfolio'
  ];
  const projectPresentation = {
    paginaparfum2: {
      title: 'Página de perfumes',
      description: 'Diseño web dedicado al mundo de la perfumería. Una muestra de presentación de productos y contenido visual.',
      image: 'images/perfumes-preview.webp',
      netlifyUrl: 'https://prefumesnoa.netlify.app/'
    },
    demoviedb: {
      title: 'DemoViedb',
      description: 'Proyecto JavaScript para explorar información relacionada con películas y contenido audiovisual.',
      image: 'https://raw.githubusercontent.com/jacinto270/demoviedb/main/assets/nevermore_bg.jpg',
      netlifyUrl: ''
    },
    'mi-lista-de-canciones': {
      title: 'Mi lista de canciones',
      description: 'Aplicación web para organizar y consultar una selección personal de canciones.',
      image: 'https://opengraph.githubassets.com/1/jacinto270/mi-lista-de-canciones',
      netlifyUrl: ''
    },
    adolescente: {
      title: 'Adolescente',
      description: 'Proyecto web con ilustraciones y recursos visuales para representar diferentes estados de ánimo.',
      image: 'https://raw.githubusercontent.com/jacinto270/adolescente/main/img/yo.png',
      netlifyUrl: 'https://jacinsom.netlify.app/'
    },
    galletasvg: {
      title: 'Galleta SVG',
      description: 'Experimento gráfico realizado con SVG, con una galleta y distintos ingredientes como elementos visuales.',
      image: 'https://raw.githubusercontent.com/jacinto270/galletasvg/main/img/galleta_toppings_originales.svg',
      netlifyUrl: 'https://juegogalleta.netlify.app/'
    },
    ejerciciosjava: {
      title: 'Ejercicios JavaScript',
      description: 'Colección de ejercicios y prácticas para aprender y experimentar con programación web.',
      image: 'https://raw.githubusercontent.com/jacinto270/ejerciciosjava/main/01EjerciciosJavaScript-main/adivinacion/img/bola_de_cristal_adivinacion.png',
      netlifyUrl: ''
    },
    proyectofinal: {
      title: 'Proyecto final',
      description: 'Sitio web de temática turística y de naturaleza, con imágenes de rutas y actividades al aire libre.',
      image: 'https://raw.githubusercontent.com/jacinto270/proyectofinal/main/assets/img/barranquismo.jpg',
      netlifyUrl: ''
    },
    'formulario-t3-practica': {
      title: 'Formulario T3',
      description: 'Práctica de desarrollo web centrada en la creación y presentación de formularios.',
      image: 'https://opengraph.githubassets.com/1/jacinto270/formulario-t3-practica',
      netlifyUrl: ''
    },
    porfolio: {
      title: 'Portfolio web',
      description: 'Proyecto de portfolio personal para presentar trabajos y practicar diseño y desarrollo web.',
      image: 'https://raw.githubusercontent.com/jacinto270/porfolio/main/img/web.png',
      netlifyUrl: 'https://julioweb24.netlify.app/'
    }
  };
  const starterRepositories = projectOrder.map(name => ({
    name,
    language: ''
  }));

  const makeElement = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.dataset.state = isError ? 'error' : 'ok';
  };

  const sortRepositories = repositories => {
    const positions = new Map(projectOrder.map((name, index) => [name, index]));
    return [...repositories].sort((left, right) => {
      const leftPosition = positions.has(left.name) ? positions.get(left.name) : Number.MAX_SAFE_INTEGER;
      const rightPosition = positions.has(right.name) ? positions.get(right.name) : Number.MAX_SAFE_INTEGER;
      return leftPosition - rightPosition || left.name.localeCompare(right.name);
    });
  };

  const renderRepository = repository => {
    const presentation = projectPresentation[repository.name] || {};
    const title = presentation.title || repository.name;
    const description = presentation.description || repository.description || '';
    const card = makeElement('article', 'repo-card');

    const media = makeElement('div', 'repo-media');
    const image = makeElement('img');
    image.src = presentation.image;
    image.alt = `Vista previa de ${title}`;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      media.replaceChildren(makeElement('span', 'repo-image-placeholder', 'Añade una imagen de vista previa en js/projects.js'));
    }, { once: true });
    media.append(image);
    card.append(media);

    const content = makeElement('div', 'repo-content');
    content.append(
      makeElement('p', 'eyebrow', repository.language || 'Proyecto'),
      makeElement('h2', '', title)
    );
    if (description) {
      content.append(makeElement('p', 'repo-description', description));
    }
    if (presentation.netlifyUrl) {
      const demoLink = makeElement('a', 'repo-link', 'Ver proyecto online ↗');
      demoLink.href = presentation.netlifyUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      content.append(demoLink);
    }
    card.append(content);
    return card;
  };

  const renderRepositories = repositories => {
    list.replaceChildren();
    const orderedRepositories = sortRepositories(repositories);
    if (!orderedRepositories.length) {
      list.append(makeElement('p', '', 'No se encontraron repositorios públicos.'));
      return;
    }
    orderedRepositories.forEach(repository => list.append(renderRepository(repository)));
  };

  const loadRepositories = async () => {
    try {
      const response = await fetch(githubApi, {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) {
        throw new Error(`GitHub respondió con el estado ${response.status}.`);
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.some(repository =>
        !repository || typeof repository.name !== 'string' || typeof repository.html_url !== 'string')) {
        throw new Error('La respuesta de GitHub no tiene el formato esperado.');
      }
      renderRepositories(data);
      setStatus(`${data.length} proyectos.`);
    } catch (error) {
      console.error('No se pudieron actualizar los repositorios de GitHub.', error);
      renderRepositories(starterRepositories);
      setStatus('No se pudo conectar con GitHub. Se muestra la lista configurada en esta página.', true);
    }
  };

  loadRepositories();
})();
