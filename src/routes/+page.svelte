<script lang="ts">
  import { t } from '$lib/i18n';
  import Navigation from '$lib/components/Navigation.svelte';
  import About from '$lib/components/About.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { NAME } from '$lib/data/constants';

  let mounted: boolean = $state(false);

  $effect(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>{NAME}</title>
  <meta
    name="description"
    content="Portfólio profissional de desenvolvedor full stack especializado em tecnologias modernas"
  />
</svelte:head>

<Navigation />

<div class="hero">
  <div class="hero-content">
    <h1 class="hero-title" class:animate={mounted}>
      {$t('hero.title')}
      <span class="gradient-text">{$t('hero.titleHighlight')}</span>
    </h1>
    <p class="hero-subtitle" class:animate={mounted}>
      {$t('hero.subtitle')}
    </p>
    <div class="hero-actions" class:animate={mounted}>
      <a href="#projetos" class="btn-primary">{$t('hero.viewProjects')}</a>
      <a href="#contacto" class="btn-secondary">{$t('hero.contact')}</a>
    </div>
  </div>
  <div class="hero-visual">
    <div class="floating-elements">
      <div class="element element-1"></div>
      <div class="element element-2"></div>
      <div class="element element-3"></div>
    </div>
  </div>
</div>

<About />
<Projects />
<Skills />
<Contact />
<Footer />

<style>
  .hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(
      135deg,
      var(--background-color) 0%,
      var(--surface-color) 100%
    );
    color: var(--text-color, white);
    overflow: hidden;
  }

  .hero-content {
    flex: 1;
    max-width: 600px;
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .hero-title.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .gradient-text {
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.2s;
  }

  .hero-subtitle.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.4s;
  }

  .hero-actions.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .btn-primary,
  .btn-secondary {
    display: inline-block;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    text-decoration: none;
  }

  .btn-primary {
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    color: var(--background-color);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }

  .btn-secondary {
    background: transparent;
    color: var(--text-color);
    border: 2px solid var(--border-color);
  }

  .btn-secondary:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateY(-2px);
  }

  .hero-visual {
    flex: 1;
    position: relative;
    height: 500px;
  }

  .floating-elements {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .element {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }

  .element-1 {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }

  .element-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 30%;
    animation-delay: 2s;
  }

  .element-3 {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 60%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }

  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
      text-align: center;
      padding: 10rem;
    }

    .hero-visual {
      height: 300px;
      margin-top: 2rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
