<script lang="ts">
  let sectionElement: HTMLElement | null = $state(null);
  let isVisible: boolean = $state(false);
  let activeCategory: string = $state('frontend');
  import { t } from '$lib/i18n';
  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => observer.disconnect();
  });
  import { skillCategories, skills } from '$lib/data/skills';

  import { achievements } from '$lib/data/achievements';

  function setActiveCategory(category: string) {
    activeCategory = category;
  }
</script>

<section id="skills" class="skills-section" bind:this={sectionElement}>
  <div class="container">
    <div class="section-header" class:animate={isVisible}>
      <h2 class="section-title">{$t('skills.title')}</h2>
      <p class="section-subtitle">
        {$t('skills.subtitle')}
      </p>
    </div>

    <div class="skills-content" class:animate={isVisible}>
      <div class="category-tabs">
        {#each Object.entries(skillCategories) as [key, category]}
          <button
            class="category-tab"
            class:active={activeCategory === key}
            onclick={() => setActiveCategory(key)}
          >
            <span class="tab-title">{category.title}</span>
          </button>
        {/each}
      </div>

      <div class="skills-grid">
        {#each skillCategories[activeCategory].skills as skill, index}
          <div
            class="skill-card"
            style="animation-delay: {index * 0.1}s"
            class:animate={isVisible}
          >
            <div class="skill-header">
              <span class="skill-icon">
                <img
                  src={skill.icon}
                  alt="{skill.name} logo"
                  width="24"
                  height="24"
                />
              </span>

              <h3 class="skill-name">{skill.name}</h3>
            </div>
            <div class="skill-level">
              <div class="level-bar">
                <div
                  class="level-fill"
                  style="width: {isVisible ? skill.level : 0}%"
                ></div>
              </div>
              <span class="level-text">{skill.level}%</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="achievements-section" class:animate={isVisible}>
      <h3 class="achievements-title">{$t('skills.achievements.title')}</h3>
      <div class="achievements-grid">
        {#each achievements as achievement, index}
          <div
            class="achievement-card"
            style="animation-delay: {index * 0.15}s"
            class:animate={isVisible}
          >
            <div class="achievement-icon">{achievement.icon}</div>
            <div class="achievement-content">
              <h4 class="achievement-title">{achievement.title}</h4>
              <p class="achievement-description">{achievement.description}</p>
              <span class="achievement-year">{achievement.year}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .skills-section {
    padding: 8rem 0;
    background: linear-gradient(
      135deg,
      var(--background-color) 0%,
      var(--surface-color) 100%
    );
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

  .skills-content {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease 0.2s;
  }

  .skills-content.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .category-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .category-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: var(--surface-color);
    border: 2px solid var(--border-color);
    border-radius: 15px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .category-tab:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateY(-2px);
  }

  .category-tab.active {
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-color: transparent;
    color: var(--background-color);
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }

  .tab-title {
    font-weight: 600;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  .skill-card {
    background: var(--surface-color);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease forwards;
  }

  .skill-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    box-shadow: var(--box-shadow);
  }

  .skill-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .skill-icon {
    font-size: 2rem;
  }

  .skill-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .skill-level {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .level-bar {
    flex: 1;
    height: 8px;
    background: var(--border-color);
    border-radius: 4px;
    overflow: hidden;
  }

  .level-fill {
    height: 100%;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-radius: 4px;
    transition: width 1.5s ease;
  }

  .level-text {
    font-weight: 600;
    color: var(--primary-color);
    min-width: 40px;
  }

  .achievements-section {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease 0.4s;
  }

  .achievements-section.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .achievements-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--primary-color);
  }

  .achievements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .achievement-card {
    background: var(--surface-color);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    text-align: center;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease forwards;
  }

  .achievement-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    box-shadow: 0 10px 25px var(--surface-color);
  }

  .achievement-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .achievement-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .achievement-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .achievement-year {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    background: var(--surface-color);
    color: var(--primary-color);
    border-radius: 15px;
    font-size: 0.9rem;
    font-weight: 600;
    border: 1px solid var(--primary-color);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
    }

    .category-tabs {
      flex-direction: column;
      align-items: center;
    }

    .skills-grid {
      grid-template-columns: 1fr;
    }

    .achievements-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
