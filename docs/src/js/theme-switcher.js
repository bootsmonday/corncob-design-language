function setTheme(theme) {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if (!theme) {
    theme = newTheme;
  }

  const normalizedTheme = theme === 'dark' ? 'dark' : 'light';

  if (normalizedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    html.style.setProperty('color-scheme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    html.style.setProperty('color-scheme', 'light');
  }

  try {
    localStorage.setItem('theme', normalizedTheme);
  } catch (_) {
    // storage unavailable (private browsing, sandboxed, or quota exceeded)
  }
}

if (typeof window !== 'undefined') {
  window.setTheme = setTheme;
}
