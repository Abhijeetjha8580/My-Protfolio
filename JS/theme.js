// ============================================
//  THEME MANAGER — Light / Dark Mode Toggle
//  FIX: createFlash() only called on USER toggle,
//  NOT on initial page load apply
// ============================================

const ThemeManager = (() => {
  const html       = document.documentElement;
  const bulb       = document.getElementById('bulb');
  const bulbToggle = document.getElementById('bulbToggle');
  const themeLabel = document.getElementById('themeLabel');

  let currentTheme = localStorage.getItem('portfolio-theme') || 'dark';

  // FIX: separate applyTheme (silent) from toggleTheme (with flash)
  function applyTheme(theme, withFlash = false) {
    currentTheme = theme;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    // Only flash when the user explicitly toggled, not on page load
    if (withFlash) createFlash();
  }

  function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true); // ← withFlash: true

    // Bulb click wobble
    if (bulb) {
      bulb.style.transition = 'transform 0.15s ease';
      bulb.style.transform  = 'scale(0.85) rotate(-10deg)';
      setTimeout(() => {
        bulb.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
          bulb.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
      }, 100);
    }
  }

  function createFlash() {
    const flash = document.createElement('div');
    flash.className = 'theme-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  }

  function init() {
    // FIX: apply saved theme silently on load (no flash)
    applyTheme(currentTheme, false);

    if (bulbToggle) {
      bulbToggle.addEventListener('click', toggleTheme);
    }

    // Keyboard shortcut: T key
    document.addEventListener('keydown', (e) => {
      if ((e.key === 't' || e.key === 'T') && !e.target.matches('input, textarea')) {
        toggleTheme();
      }
    });
  }

  return { init, toggleTheme, applyTheme };
})();

document.addEventListener('DOMContentLoaded', ThemeManager.init);