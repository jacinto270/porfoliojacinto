// Aplica el tema guardado antes de pintar la página (se carga sin defer en <head>).
(() => {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.dataset.theme = savedTheme;
    }
  } catch (error) {
    // localStorage puede no estar disponible (modo privado, cookies bloqueadas).
  }
  const theme = document.documentElement.dataset.theme;
  const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = dark ? '#131b29' : '#f2eee6';
})();
