function setTheme(theme) {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if (!theme) {
    theme = newTheme;
  }

  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    html.style.setProperty('color-scheme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    html.style.setProperty('color-scheme', 'light');
  }

  localStorage.setItem('theme', theme);
}

if (typeof window !== 'undefined') {
  window.setTheme = setTheme;
}
