<script lang="ts">
  import { projects } from '../data/projects';
  import { filters } from '../data/filters';
  import { t } from '$lib/i18n';

  let sectionElement: HTMLElement | null = $state(null);
  let isVisible: boolean = $state(false);
  let selectedFilter: 'all' | 'fullstack' | 'frontend' | 'backend' =
    $state('all');

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => observer.disconnect();
  });

  let filteredProjects = $derived(
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter)
  );

  function setFilter(filterId: typeof selectedFilter) {
    selectedFilter = filterId;
  }
</script>

<section id="projetos" class="projects-section" bind:this={sectionElement}>
  <div class="container">
    <div class="section-header" class:animate={isVisible}>
      <h2 class="section-title">{$t('projects.title')}</h2>
      <p class="section-subtitle">{$t('projects.subtitle')}</p>
    </div>

    <div class="filter-tabs" class:animate={isVisible}>
      {#each filters as filter}
        <button
          class="filter-btn"
          class:active={selectedFilter === filter.id}
          onclick={() => setFilter(filter.id)}
        >
          {$t(filter.labelKey)}
        </button>
      {/each}
    </div>

    <div class="projects-grid" class:animate={isVisible}>
      {#each filteredProjects as project, index}
        <div
          class="project-card"
          class:featured={project.featured}
          style="animation-delay: {index * 0.1}s"
        >
          <div class="project-image">
            <span class="project-icon">{project.image}</span>
            <div class="project-overlay">
              <div class="project-links">
                {#if project.github}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener"
                    class="project-link"
                  >
                    <span>{$t('projects.github')}</span>
                  </a>
                {/if}
                {#if project.demo}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener"
                    class="project-link demo"
                  >
                    <span>{$t('projects.demo')}</span>
                  </a>
                {/if}
              </div>
            </div>
          </div>

          <div class="project-content">
            <h3 class="project-title">{$t(project.titleKey)}</h3>
            <p class="project-description">{$t(project.descriptionKey)}</p>

            <div class="project-technologies">
              {#each project.technologies as tech}
                <span class="tech-tag">{tech}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects-section {
    padding: 8rem 0;
    background: var(--background-color);
    color: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .section-header.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .filter-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease 0.2s;
  }

  .filter-tabs.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .filter-btn {
    padding: 0.8rem 1.5rem;
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--text-secondary);
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .filter-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }

  .filter-btn.active {
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-color: transparent;
    color: var(--background-color);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease 0.4s;
  }

  .projects-grid.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card {
    background: var(--white-005);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease forwards;
  }

  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--box-shadow);
    border-color: var(--border-color);
  }

  .project-card.featured {
    border-color: var(--border-color);
    box-shadow: var(--box-shadow);
  }

  .project-image {
    position: relative;
    height: 200px;
    background: linear-gradient(
      135deg,
      var(--primary-color),
      var(--secondary-color)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .project-icon {
    font-size: 4rem;
    opacity: 0.8;
  }

  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--black-80);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-links {
    display: flex;
    gap: 1rem;
  }

  .project-link {
    padding: 0.8rem 1.5rem;
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    text-decoration: none;
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .project-link:hover {
    background: var(--primary-color);
    color: var(--background-color);
  }

  .project-link.demo {
    background: var(--primary-color);
    color: var(--background-color);
  }

  .project-link.demo:hover {
    background: var(--secondary-color);
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    color: var(--primary-color);
  }

  .project-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tech-tag {
    padding: 0.3rem 0.8rem;
    background: var(--border-color);
    color: var(--primary-color);
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }

    .filter-tabs {
      flex-wrap: wrap;
    }

    .section-title {
      font-size: 2rem;
    }

    .project-links {
      flex-direction: column;
    }
  }
</style>
