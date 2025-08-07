<script lang="ts">
  import { t } from '$lib/i18n';
  import ThemeToggle from './ThemeToggle.svelte';
  import LanguageToggle from './LanguageToggle.svelte';

  let isMenuOpen: boolean = $state(false);
  let scrolled: boolean = $state(false);

  $effect(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<nav class="nav" class:scrolled>
  <div class="nav-container">
    <a href="/" class="logo" onclick={closeMenu}>
      <span class="logo-text">{$t('about.name')}</span>
    </a>

    <div class="nav-links" class:open={isMenuOpen}>
      <a href="#sobre" onclick={closeMenu}>{$t('nav.about')}</a>
      <a href="#projetos" onclick={closeMenu}>{$t('nav.projects')}</a>
      <a href="#skills" onclick={closeMenu}>{$t('nav.skills')}</a>
      <a href="#contacto" onclick={closeMenu}>{$t('nav.contact')}</a>
    </div>

    <div class="nav-controls">
      <ThemeToggle />
      <LanguageToggle />

      <button
        class="menu-toggle"
        class:open={isMenuOpen}
        onclick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
    background: var(--background-color);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color, var(--border-color));
  }

  .nav.scrolled {
    background: var(--background-color);
    box-shadow: 0 2px 20px var(--shadow, var(--shadow));
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    text-decoration: none;
    color: var(--text-color, white);
    font-weight: 900;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  .logo:hover {
    color: var(--primary-color, var(--primary-color));
  }

  .logo-text {
    background: linear-gradient(
      45deg,
      var(--primary-color, var(--primary-color)),
      var(--secondary-color, var(--secondary-color))
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-links a {
    text-decoration: none;
    color: var(--text-secondary, var(--text-secondary));
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-links a:hover {
    color: var(--primary-color, var(--primary-color));
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      45deg,
      var(--primary-color, var(--primary-color)),
      var(--secondary-color, var(--secondary-color))
    );
    transition: width 0.3s ease;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .nav-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    gap: 4px;
  }

  .menu-toggle span {
    width: 25px;
    height: 3px;
    background: var(--primary-color, var(--primary-color));
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .menu-toggle.open span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .menu-toggle.open span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.open span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      background: var(--background-color);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 2rem;
      gap: 1.5rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      border-bottom: 1px solid var(--border-color, var(--border-color));
    }

    .nav-links.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-links a {
      font-size: 1.2rem;
    }

    .nav-controls {
      gap: 0.5rem;
    }

    .menu-toggle {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    .nav-container {
      padding: 0 1rem;
    }

    .nav-controls {
      gap: 0.25rem;
    }
  }
</style>
