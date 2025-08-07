import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Import translations JSON
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

/**
 * Supported locale codes as literal union type.
 */
const LOCALES = ['pt', 'en', 'es', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

/**
 * Dictionary of available translations by locale code.
 * @type {Record<Locale, object>}
 */
const translations: Record<Locale, object> = {
  pt,
  en,
  es,
  fr,
};

/**
 * Detects the user's browser language.
 * @returns {Locale} The language code ('pt' or 'en').
 */
function getBrowserLanguage(): Locale {
  if (browser && typeof navigator !== 'undefined' && navigator.language) {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('en')) return 'en';
  }
  return 'pt'; // Default to Portuguese
}

/**
 * Retrieves the initial locale from localStorage or browser language.
 * @returns {Locale} The initial locale code.
 */
function getInitialLanguage(): Locale {
  if (browser) {
    const saved = localStorage.getItem('language');
    if (saved && LOCALES.includes(saved as Locale)) {
      return saved as Locale;
    }
  }
  return getBrowserLanguage();
}

/**
 * Writable store for the currently selected locale.
 * @type {import('svelte/store').Writable<Locale>}
 */
export const locale = writable<Locale>(getInitialLanguage());

/**
 * Derived store providing a translation function `t(key, vars)`.
 * This function looks up a translation string by key and interpolates variables.
 * @type {import('svelte/store').Readable<(key: string, vars?: Record<string, string>) => string>}
 */
export const t = derived(locale, ($locale) => {
  /**
   * Translation function to be used in components.
   * @param {string} key - Dot-separated key path, e.g. 'navbar.home'
   * @param {Record<string, string>} [vars={}] - Optional variables to interpolate into the string
   * @returns {string} The localized string or the key if not found.
   */
  return function translate(
    key: string,
    vars: Record<string, string> = {}
  ): string {
    const keys = key.split('.');
    let value: any = translations[$locale];

    // Traverse translation tree for the key
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If missing, fallback to Portuguese translations
        value = translations.pt;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            // Return key if no translation found
            return key;
          }
        }
        break;
      }
    }

    // If final value is not a string, return key
    if (typeof value !== 'string') return key;

    // Interpolate variables like {{variable}}
    let result: string = value;
    Object.keys(vars).forEach((variable) => {
      // Escape special regex chars if needed on vars[variable]
      // Simple direct replace for now:
      result = result.replace(
        new RegExp(`{{${variable}}}`, 'g'),
        vars[variable]
      );
    });

    return result;
  };
});

/**
 * Sets the current locale.
 * Updates the store, localStorage, and the `<html lang>` attribute.
 * @param {Locale} newLocale - The desired locale code.
 */
export function setLocale(newLocale: Locale): void {
  if (!LOCALES.includes(newLocale)) return;

  locale.set(newLocale);

  if (browser) {
    localStorage.setItem('language', newLocale);
    document.documentElement.setAttribute('lang', newLocale);
  }
}

/**
 * Toggles between the supported locales.
 * @returns {void}
 */
export function toggleLocale(): void {
  locale.update((currentLocale) => {
    const newLocale = currentLocale === 'pt' ? 'en' : 'pt';
    setLocale(newLocale);
    return newLocale;
  });
}

/**
 * Ensures that `<html lang>` attribute is always synced to current locale.
 */
if (browser) {
  locale.subscribe((currentLocale) => {
    document.documentElement.setAttribute('lang', currentLocale);
  });
}

/**
 * Returns a list of available locales.
 * @returns {Locale[]} Array of locale codes
 */
export function getAvailableLocales(): Locale[] {
  return LOCALES.slice();
}

/**
 * Gets a human-readable name for a locale code.
 * @param {string} localeCode - The locale code.
 * @returns {string} The display name or the original code if unknown.
 */
export function getLocaleName(localeCode: string): string {
  const names: Record<Locale, string> = {
    pt: 'Português',
    en: 'English',
    fr: 'Français',
    es: 'Espagnol',
  };
  return names[localeCode as Locale] || localeCode;
}
