<script lang="ts">
  import { locale, setLocale, t } from '$lib/i18n';

  let isOpen: boolean = $state(false);
  let dropdownElement: HTMLDivElement | null = $state(null);

  const languages = [
    { code: 'pt', flag: '🇵🇹' }, // Portuguese (Portugal)
    { code: 'en', flag: '🇺🇸' }, // English (United States)
    { code: 'es', flag: '🇪🇸' }, // Spanish (Spain)
    { code: 'fr', flag: '🇫🇷' }, // French (France)
  ];

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectLanguage(langCode: string) {
    // @ts-ignore
    setLocale(langCode);
    isOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }

  let currentLanguage = $derived(
    languages.find((lang) => lang.code === $locale)
  );
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div class="language-toggle" bind:this={dropdownElement}>
  <button
    class="language-button"
    onclick={toggleDropdown}
    aria-label={$t('language.switchTo')}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    <span class="language-flag">{currentLanguage?.flag}</span>
    <span class="dropdown-arrow" class:open={isOpen}>▼</span>
  </button>

  {#if isOpen}
    <div class="language-dropdown" role="menu">
      {#each languages as language}
        <button
          class="language-option"
          class:active={language.code === $locale}
          onclick={() => selectLanguage(language.code)}
          role="menuitem"
          tabindex="0"
        >
          <span class="option-flag">{language.flag}</span>
          {#if language.code === $locale}
            <span class="check-mark">✓</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-toggle {
    position: relative;
    display: inline-block;
  }

  .language-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    width: auto;
  }

  .language-button:hover {
    background: var(--surface-hover);
    border-color: var(--primary-color);
  }

  .language-button:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .language-flag {
    font-size: 1.1rem;
    line-height: 1;
  }

  .dropdown-arrow {
    font-size: 0.7rem;
    transition: transform 0.3s ease;
    color: var(--text-secondary);
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .language-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.5rem;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 12px var(--shadow);
    z-index: 1000;
    overflow: hidden;
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .language-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-size: 0.9rem;
  }

  .language-option:hover {
    background: var(--surface-hover);
  }

  .language-option:focus {
    background: var(--surface-hover);
    outline: none;
  }

  .language-option.active {
    background: var(--border-color);
    color: var(--primary-color);
  }

  .option-flag {
    font-size: 1.1rem;
    line-height: 1;
  }

  .check-mark {
    color: var(--primary-color);
    font-weight: bold;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .language-button {
      min-width: auto;
      padding: 0.6rem;
    }

    .language-dropdown {
      right: 0;
      left: auto;
    }
  }
</style>
