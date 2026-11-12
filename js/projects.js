// proyectos.html: combina los repositorios públicos de GitHub con la presentación de projects-data.js.
(() => {
  const { githubUser, order, hidden, details, toProject, createCard } = window.portfolioProjects;
  const apiUrl = `https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`;
  const cacheKey = 'portfolio-github-repos';
  const cacheLifetime = 60 * 60 * 1000; // 1 hora: la API sin autenticar permite 60 peticiones por hora.

  const showcase = document.getElementById('projectsShowcase');
  const more = document.getElementById('projectsMore');
  const moreSection = document.getElementById('moreSection');
  const status = document.getElementById('projectsStatus');

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.dataset.state = isError ? 'error' : 'ok';
  };

  const readCache = () => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey));
      return cached && Date.now() - cached.time < cacheLifetime ? cached.repositories : null;
    } catch { return null; }
  };
  const writeCache = repositories => {
    try { sessionStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), repositories })); } catch { /* sin almacenamiento */ }
  };

  const position = name => {
    const index = order.indexOf(name);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };

  const render = projects => {
    const visible = projects
      .filter(project => !hidden.includes(project.name))
      .sort((a, b) => position(a.name) - position(b.name) || a.title.localeCompare(b.title, 'es'));
    const withImage = visible.filter(project => project.image);
    const withoutImage = visible.filter(project => !project.image);

    showcase.replaceChildren(...withImage.map(project => createCard(project, { compact: false })));
    more.replaceChildren(...withoutImage.map(project => createCard(project, { compact: true })));
    moreSection.hidden = withoutImage.length === 0;
    if (!visible.length) showcase.replaceChildren(Object.assign(document.createElement('p'), { textContent: 'Todavía no hay proyectos publicados.' }));
    return visible.length;
  };

  const fetchRepositories = async () => {
    const cached = readCache();
    if (cached) return cached;
    const response = await fetch(apiUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub respondió con el estado ${response.status}.`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('La respuesta de GitHub no tiene el formato esperado.');
    // Solo se guardan los campos necesarios.
    const repositories = data
      .filter(repo => repo && typeof repo.name === 'string' && !repo.fork)
      .map(({ name, description, language, homepage, html_url }) => ({ name, description, language, homepage, html_url }));
    writeCache(repositories);
    return repositories;
  };

  const load = async () => {
    try {
      const repositories = await fetchRepositories();
      const total = render(repositories.map(repo => toProject(repo.name, repo)));
      setStatus(`${total} proyectos públicos, sincronizados con GitHub.`);
    } catch (error) {
      console.error('No se pudieron cargar los repositorios de GitHub.', error);
      // Sin conexión con GitHub se muestra la lista configurada en projects-data.js.
      const names = [...new Set([...order, ...Object.keys(details)])];
      render(names.map(name => toProject(name)));
      setStatus('No se ha podido conectar con GitHub en este momento. Se muestra la lista de proyectos guardada.', true);
    }
  };

  load();
})();
