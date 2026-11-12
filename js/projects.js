(() => {
  const githubUser = 'jacinto270';
  const githubApi = `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`;
  const list = document.getElementById('projectsList');
  const status = document.getElementById('projectsStatus');
  const portfolioTechnologies = ['HTML', 'CSS', 'JavaScript'];

  // Personaliza aquí el orden, título, descripción, imagen y URL pública de cada proyecto.
  // Sustituye image por una ruta propia, por ejemplo "images/mi-proyecto.jpg".
  // Rellena netlifyUrl solo cuando el proyecto tenga una demo publicada en Netlify.
  const projectOrder = [
    'paginaparfum2',
    'demoviedb',
    'pasapalabra',
    'mi-lista-de-canciones',
    'bibliotecaapp',
    'directores',
    'lista-compra',
    'uf1842-TF',
    'adolescente',
    'galletasvg',
    'bola-de-cristal',
    'ejerciciosjava',
    'proyectofinal',
    'formulario-t3-practica',
    'biblioteca',
    'sql',
    'peliculas',
    'login',
    'trabajo1',
    'porfoliojacinto',
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
      netlifyUrl: 'https://demoviedb.netlify.app/'
    },
    'mi-lista-de-canciones': {
      title: 'Mi lista de canciones',
      description: 'Aplicación web para organizar y consultar una selección personal de canciones.',
      image: 'images/mi-lista-de-canciones.jpeg',
      netlifyUrl: 'https://listadecancionesjacinto.netlify.app/'
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
      image: 'images/formulario-t3.jpg',
      netlifyUrl: ''
    },
    porfolio: {
      title: 'Portfolio web',
      description: 'Proyecto de portfolio personal para presentar trabajos y practicar diseño y desarrollo web.',
      image: 'https://raw.githubusercontent.com/jacinto270/porfolio/main/img/web.png',
      netlifyUrl: 'https://julioweb24.netlify.app/'
    },
    porfoliojacinto: {
      title: 'Portfolio Jacinto',
      description: 'Portfolio personal interactivo con un retrato ilustrado por capas.',
      image: 'images/portfolio-jacinto-preview.png',
      netlifyUrl: ''
    },
    pasapalabra: {
      title: 'El Rosco',
      description: 'Juego de preguntas inspirado en el rosco de 27 letras, con tres modos de tiempo y marcador de aciertos y fallos.',
      image: 'images/pasapalabra-preview.jpg',
      netlifyUrl: 'https://pasapalabranoa.vercel.app'
    },
    'lista-compra': {
      title: 'Lista de la compra',
      description: 'Aplicación PHP con base de datos SQLite para añadir productos con imagen, marcarlos como comprados y ver el progreso. Instalable como app (PWA).',
      image: 'images/lista-compra-preview.jpg',
      technologies: ['PHP', 'SQLite', 'CSS', 'PWA']
    },
    'uf1842-TF': {
      title: 'Club de montaña',
      description: 'Web de un club de montaña con cursos de temporada, rutas y un mensaje de bienvenida en audio con transcripción.',
      image: 'images/uf1842-tf-preview.jpg'
    },
    'bola-de-cristal': {
      title: 'Bola de cristal',
      description: 'Pequeño juego de adivinación: pulsa el botón y la bola de cristal te da una respuesta al azar.',
      image: 'images/bola-de-cristal-preview.jpg'
    },
    biblioteca: {
      title: 'Biblioteca',
      description: 'Base de datos de una biblioteca con libros, lectores y préstamos, y una colección de consultas SQL.',
      image: 'images/biblioteca-preview.jpg',
      technologies: ['SQL', 'MySQL']
    },
    sql: {
      title: 'Consultas SQL',
      description: 'Prácticas de consultas SQL sobre una base de datos de películas y directores: filtros, orden y alias.',
      image: 'images/sql-preview.jpg',
      technologies: ['SQL', 'MySQL']
    },
    bibliotecaapp: {
      title: 'Biblioteca municipal',
      description: 'Aplicación de gestión de préstamos: libros, lectores, avisos de retraso, estadísticas y tema claro/oscuro.',
      image: 'images/bibliotecaapp-preview.jpg',
      technologies: ['PHP', 'MySQL', 'CSS', 'JavaScript']
    },
    directores: {
      title: 'Catálogo de películas',
      description: 'Catálogo de películas y directores con registro de usuarios, verificación por correo, inicio de sesión y panel de gestión.',
      image: 'images/directores-preview.jpg',
      technologies: ['PHP', 'MySQL', 'CSS', 'JavaScript']
    },
    peliculas: {
      title: 'Películas (DAO)',
      description: 'Práctica de acceso a datos en PHP con el patrón DAO: listar, crear, actualizar y eliminar películas.',
      image: 'images/peliculas-preview.jpg',
      technologies: ['PHP', 'SQLite']
    },
    login: {
      title: 'Inicio de sesión',
      description: 'Práctica de formulario de inicio de sesión con sesiones en PHP y gestión de archivos.',
      image: 'images/login-preview.jpg',
      technologies: ['PHP', 'CSS']
    },
    trabajo1: {
      title: 'Primeros pasos con PHP',
      description: 'Ejercicios de PHP: funciones, bucles, formularios, sesiones y una calculadora de tarifas.',
      image: 'images/trabajo1-preview.jpg',
      technologies: ['PHP', 'HTML']
    },
    jacinto270: {
      title: 'Jacinto270 en GitHub',
      description: 'Mi perfil y mis proyectos en GitHub.',
      image: 'https://github.com/jacinto270.png',
      githubUrl: 'https://github.com/jacinto270'
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
    const showPlaceholder = () => {
      media.replaceChildren(makeElement('span', 'repo-image-placeholder', 'Vista previa no disponible'));
    };
    if (presentation.image) {
      const image = makeElement('img');
      image.src = presentation.image;
      image.alt = `Vista previa de ${title}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', showPlaceholder, { once: true });
      media.append(image);
    } else {
      showPlaceholder();
    }
    card.append(media);

    const content = makeElement('div', 'repo-content');
    content.append(makeElement('h2', '', title));
    if (description) {
      content.append(makeElement('p', 'repo-description', description));
    }
    const technologies = makeElement('ul', 'repo-technologies');
    technologies.setAttribute('aria-label', 'Tecnologías utilizadas');
    (presentation.technologies || portfolioTechnologies).forEach(technology => {
      technologies.append(makeElement('li', 'repo-technology', technology));
    });
    content.append(technologies);
    if (presentation.githubUrl) {
      const githubLink = makeElement('a', 'repo-link', 'Ver perfil en GitHub ↗');
      githubLink.href = presentation.githubUrl;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
      content.append(githubLink);
    }
    const links = makeElement('div', 'repo-links');
    if (presentation.netlifyUrl) {
      const demoLink = makeElement('a', 'repo-link', 'Ver proyecto online ↗');
      demoLink.href = presentation.netlifyUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      links.append(demoLink);
    }
    if (!presentation.githubUrl) {
      const codeLink = makeElement('a', 'repo-link repo-link-secondary', 'Ver código ↗');
      codeLink.href = repository.html_url || `https://github.com/${githubUser}/${repository.name}`;
      codeLink.target = '_blank';
      codeLink.rel = 'noopener noreferrer';
      links.append(codeLink);
    }
    if (links.childElementCount) content.append(links);
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
      // Las bifurcaciones (forks) no son trabajo propio: se ocultan.
      const ownRepositories = data.filter(repository => !repository.fork);
      renderRepositories(ownRepositories);
      setStatus(`${ownRepositories.length} proyectos.`);
    } catch (error) {
      console.error('No se pudieron actualizar los repositorios de GitHub.', error);
      renderRepositories(starterRepositories);
      setStatus('No se pudo conectar con GitHub. Se muestra la lista configurada en esta página.', true);
    }
  };

  loadRepositories();
})();
