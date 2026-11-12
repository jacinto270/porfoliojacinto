// Tema claro/oscuro compartido por todas las páginas.
// Se carga en <head> sin "defer" para aplicar el tema guardado antes del primer pintado.
(() => {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const readTheme = () => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  };
  const saveTheme = theme => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* almacenamiento no disponible */ }
  };

  const saved = readTheme();
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches);

  const sync = () => {
    const dark = isDark();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#232b37' : '#f5e6d3';
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const label = dark ? 'Activar modo claro' : 'Activar modo oscuro';
      button.setAttribute('aria-label', label);
      button.title = label;
      button.dataset.state = dark ? 'dark' : 'light';
    });
  };

  sync();
  document.addEventListener('DOMContentLoaded', () => {
    sync();
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        root.dataset.theme = next;
        saveTheme(next);
        sync();
      });
    });
  });
  systemDark.addEventListener('change', () => {
    if (!root.dataset.theme) sync();
  });
})();
