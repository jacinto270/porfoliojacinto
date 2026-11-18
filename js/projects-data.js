// Datos de los proyectos y creación de tarjetas.
// Lo usan la página principal (proyectos destacados) y proyectos.html (listado completo).
(() => {
  const githubUser = 'jacinto270';

  // Proyectos que aparecen en la página principal (máximo 3).
  const featured = ['demoviedb', 'paginaparfum2', 'bibliotecaapp'];

  // Orden en proyectos.html. Los repositorios que no estén aquí aparecen al final.
  const order = [
    'tallerapp',
    'demoviedb',
    'paginaparfum2',
    'bibliotecaapp',
    'proyectofinal',
    'pasapalabra',
    'galletasvg',
    'adolescente',
    'porfoliojacinto',
    'porfolio',
    'formulario-t3-practica',
    'ejerciciosjava',
    'mi-lista-de-canciones',
    'peliculas',
    'lista-compra',
    'login',
    'directores',
    'uf1842-TF',
    'bola-de-cristal',
    'trabajo1',
    'biblioteca',
    'sql'
  ];

  // Repositorios que no se muestran (por ejemplo, el README del perfil).
  const hidden = ['jacinto270'];

  // Presentación personalizada. Clave = nombre exacto del repositorio en GitHub.
  // - image: ruta local (images/...) o URL. Los proyectos con imagen se muestran como tarjeta grande.
  // - demoUrl: demo publicada. Si se deja vacío, se usa la web indicada en GitHub (campo "homepage").
  // - technologies: etiquetas. Si se omite, se usa el lenguaje principal que detecta GitHub.
  const details = {
    tallerapp: {
      title: 'Taller Genil',
      description: 'Gestión de un taller mecánico: reparaciones con piezas y mano de obra por horas, facturas imprimibles, clientes, estadísticas de ventas con gráficos y área privada para que cada cliente consulte sus facturas. Con login por roles, contraseñas cifradas y protección CSRF.',
      image: 'images/tallerapp-preview.jpg',
      demoUrl: '',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS']
    },
    demoviedb: {
      title: 'Archivos de Nevermore',
      description: 'Buscador de series ambientado en la familia Addams. Consulta la API de TVMaze, traduce las sinopsis al español con la API de MyMemory y añade efectos de sonido.',
      image: 'https://raw.githubusercontent.com/jacinto270/demoviedb/main/assets/nevermore_bg.jpg',
      demoUrl: 'https://demoviedb.netlify.app/',
      technologies: ['JavaScript', 'API REST', 'fetch', 'CSS']
    },
    paginaparfum2: {
      title: 'Perfumería Noa',
      description: 'Web de una perfumería centrada en la presentación de productos y el contenido visual.',
      image: 'images/perfumes-preview.webp',
      demoUrl: 'https://prefumesnoa.netlify.app/',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    'mi-lista-de-canciones': {
      title: 'Mi lista de canciones',
      description: 'Aplicación web para organizar y consultar una selección personal de canciones.',
      image: 'images/mi-lista-de-canciones.jpeg',
      demoUrl: 'https://listadecancionesjacinto.netlify.app/',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    proyectofinal: {
      title: 'A pata coja',
      description: 'Proyecto final: web de turismo de naturaleza con rutas y actividades al aire libre.',
      image: 'https://raw.githubusercontent.com/jacinto270/proyectofinal/main/assets/img/barranquismo.jpg',
      demoUrl: 'https://a-pata-coja.vercel.app',
      technologies: ['HTML', 'CSS']
    },
    pasapalabra: {
      title: 'Pasapalabra',
      description: 'Juego de preguntas inspirado en el rosco de 27 letras, con tres modos de tiempo y marcador de aciertos y fallos.',
      image: 'images/pasapalabra-preview.jpg',
      demoUrl: 'https://pasapalabranoa.vercel.app',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    galletasvg: {
      title: 'Galleta SVG',
      description: 'Experimento gráfico con SVG y JavaScript: una galleta que se decora con distintos ingredientes.',
      image: 'https://raw.githubusercontent.com/jacinto270/galletasvg/main/img/galleta_toppings_originales.svg',
      demoUrl: 'https://juegogalleta.netlify.app/',
      technologies: ['SVG', 'JavaScript', 'CSS']
    },
    adolescente: {
      title: 'Adolescente',
      description: 'Web ilustrada que representa distintos estados de ánimo con recursos visuales propios.',
      image: 'https://raw.githubusercontent.com/jacinto270/adolescente/main/img/yo.png',
      demoUrl: 'https://jacinsom.netlify.app/',
      technologies: ['HTML', 'CSS']
    },
    porfoliojacinto: {
      title: 'Este portfolio',
      description: 'Portfolio interactivo con un autorretrato SVG por capas, efecto de spray en canvas y tema claro/oscuro.',
      image: 'images/portfolio-jacinto-preview.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'SVG', 'Canvas']
    },
    porfolio: {
      title: 'Primer portfolio',
      description: 'Mi primer portfolio personal, creado para practicar maquetación y diseño web.',
      image: 'https://raw.githubusercontent.com/jacinto270/porfolio/main/img/web.png',
      demoUrl: 'https://julioweb24.netlify.app/',
      technologies: ['HTML', 'CSS']
    },
    'formulario-t3-practica': {
      title: 'Formulario T3',
      description: 'Práctica centrada en la creación, maquetación y validación de formularios web.',
      image: 'images/formulario-t3.jpg',
      technologies: ['HTML', 'CSS']
    },
    ejerciciosjava: {
      title: 'Ejercicios de JavaScript',
      description: 'Colección de ejercicios prácticos de lógica de programación y manipulación del DOM.',
      image: 'https://raw.githubusercontent.com/jacinto270/ejerciciosjava/main/01EjerciciosJavaScript-main/adivinacion/img/bola_de_cristal_adivinacion.png',
      technologies: ['JavaScript', 'HTML']
    },
    bibliotecaapp: {
      title: 'Biblioteca App',
      description: 'Aplicación de gestión de préstamos: libros, lectores, avisos de retraso, estadísticas y tema claro/oscuro.',
      image: 'images/bibliotecaapp-preview.jpg',
      demoUrl: 'https://appbiblioteca.42web.io/libros.php',
      technologies: ['PHP', 'MySQL', 'CSS', 'JavaScript']
    },
    peliculas: {
      title: 'Películas',
      description: 'Práctica de acceso a datos en PHP con el patrón DAO: listar, crear, actualizar y eliminar películas.',
      image: 'images/peliculas-preview.jpg',
      technologies: ['PHP', 'SQLite']
    },
    'lista-compra': {
      title: 'Lista de la compra',
      description: 'Aplicación PHP con base de datos SQLite para añadir productos con imagen, marcarlos como comprados y ver el progreso. Instalable como app (PWA).',
      image: 'images/lista-compra-preview.jpg',
      technologies: ['PHP', 'SQLite', 'CSS', 'PWA']
    },
    login: {
      title: 'Sistema de login',
      description: 'Práctica de formulario de inicio de sesión con sesiones en PHP y gestión de archivos.',
      image: 'images/login-preview.jpg',
      technologies: ['PHP', 'CSS']
    },
    directores: {
      title: 'Directores',
      description: 'Catálogo de películas y directores con registro de usuarios, verificación por correo, inicio de sesión y panel de gestión.',
      image: 'images/directores-preview.jpg',
      technologies: ['PHP', 'MySQL', 'CSS', 'JavaScript']
    },
    'uf1842-TF': {
      title: 'UF1842 · Trabajo final',
      description: 'Web de un club de montaña con cursos de temporada, rutas y un mensaje de bienvenida en audio con transcripción.',
      image: 'images/uf1842-tf-preview.jpg'
    },
    'bola-de-cristal': {
      title: 'Bola de cristal',
      description: 'Pequeño juego de adivinación: pulsa el botón y la bola de cristal te da una respuesta al azar.',
      image: 'images/bola-de-cristal-preview.jpg'
    },
    trabajo1: {
      title: 'Trabajo 1',
      description: 'Ejercicios de PHP: funciones, bucles, formularios, sesiones y una calculadora de tarifas.',
      image: 'images/trabajo1-preview.jpg',
      technologies: ['PHP', 'HTML']
    },
    biblioteca: {
      title: 'Biblioteca',
      description: 'Base de datos de una biblioteca con libros, lectores y préstamos, y una colección de consultas SQL.',
      image: 'images/biblioteca-preview.jpg',
      technologies: ['SQL', 'MySQL']
    },
    sql: {
      title: 'Ejercicios SQL',
      description: 'Prácticas de consultas SQL sobre una base de datos de películas y directores: filtros, orden y alias.',
      image: 'images/sql-preview.jpg',
      technologies: ['SQL', 'MySQL']
    }
  };

  const prettifyName = name => name
    .replace(/[-_]+/g, ' ')
    .replace(/^\w/, letter => letter.toUpperCase());

  // Une los datos de GitHub (si los hay) con la presentación personalizada.
  const toProject = (name, repository = {}) => {
    const custom = details[name] || {};
    const language = repository.language;
    return {
      name,
      title: custom.title || prettifyName(name),
      description: custom.description || repository.description || '',
      image: custom.image || '',
      demoUrl: custom.demoUrl || repository.homepage || '',
      codeUrl: repository.html_url || `https://github.com/${githubUser}/${name}`,
      technologies: custom.technologies || (language ? [language] : [])
    };
  };

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const externalLink = (className, text, href, label) => {
    const link = element('a', className, text);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${label} (se abre en una pestaña nueva)`);
    return link;
  };

  const initials = title => title
    .split(/\s+/)
    .filter(word => /\w/.test(word))
    .slice(0, 2)
    .map(word => word[0])
    .join('');

  const createCard = (project, { headingLevel = 'h3', compact = !project.image } = {}) => {
    const card = element('article', compact ? 'project-card is-compact' : 'project-card');

    if (!compact) {
      const media = element('div', 'project-media');
      const image = element('img');
      image.src = project.image;
      image.alt = `Captura del proyecto ${project.title}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => {
        media.replaceChildren(element('span', 'project-placeholder', initials(project.title)));
      }, { once: true });
      media.append(image);
      card.append(media);
    }

    const body = element('div', 'project-body');
    body.append(element(headingLevel, '', project.title));
    if (project.description) body.append(element('p', '', project.description));

    if (project.technologies.length) {
      const tags = element('ul', 'tags');
      tags.setAttribute('aria-label', 'Tecnologías');
      project.technologies.forEach(technology => tags.append(element('li', '', technology)));
      body.append(tags);
    }

    const links = element('div', 'project-links');
    if (project.demoUrl) {
      links.append(externalLink('project-link is-primary', 'Ver demo ↗', project.demoUrl, `Ver demo de ${project.title}`));
    }
    links.append(externalLink('project-link', 'Código ↗', project.codeUrl, `Ver código de ${project.title} en GitHub`));
    body.append(links);

    card.append(body);
    return card;
  };

  window.portfolioProjects = { githubUser, featured, order, hidden, details, toProject, createCard };
})();
