import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Detects system color scheme preference from the browser.
 * @returns {'light' | 'dark'} The user's system theme preference.
 */
function getSystemTheme() {
  if (browser && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'dark'; // Default if detection fails
}

/**
 * Gets the initial theme from localStorage or system preference.
 * @returns {'light' | 'dark'} The initial theme.
 */
function getInitialTheme(): 'light' | 'dark' {
  if (browser) {
    const saved = localStorage.getItem('theme');
    if (saved && (saved === 'light' || saved === 'dark')) {
      return saved;
    }
  }
  return getSystemTheme();
}

/**
 * Svelte store for the UI theme, initializes with initial theme.
 * @type {import('svelte/store').Writable<'light' | 'dark'>}
 */
export const theme = writable(getInitialTheme());

/**
 * Toggles between light and dark themes.
 * Updates the store, localStorage, and the root DOM attribute.
 */
export function toggleTheme() {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    if (browser) {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    return newTheme;
  });
}

/**
 * Sets the theme to either 'light' or 'dark'.
 * Updates the store, localStorage, and the root DOM attribute.
 * @param {'light' | 'dark'} newTheme - Theme to apply.
 */
export function setTheme(newTheme: 'dark' | 'light') {
  if (newTheme !== 'light' && newTheme !== 'dark') return;
  theme.set(newTheme);
  if (browser) {
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}

/**
 * Initializes theme and watches for system theme changes in the browser.
 */
if (browser) {
  theme.subscribe((currentTheme) => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  });

  // Listen for changes to the system color scheme and respond if no preference is saved
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}
