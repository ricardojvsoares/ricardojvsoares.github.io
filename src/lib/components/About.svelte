<script lang="ts">
  import { skills } from '$lib/data/skills';
  import { experiences } from '$lib/data/experience';
  import { NAME, PROJECTS, YEARS_OF_EXPERIENCE } from '$lib/data/constants';
  import { t } from '$lib/i18n';

  let sectionElement: HTMLElement | null = $state(null);
  let isVisible = $state(false);
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
</script>

<section id="sobre" class="about-section" bind:this={sectionElement}>
  <div class="container">
    <div class="about-content" class:animate={isVisible}>
      <div class="about-text">
        <h2 class="section-title">{$t('about.title')}</h2>
        <p class="about-description">
          {$t('about.description')}
        </p>
        <p class="about-description">
          {$t('about.philosophy')}
        </p>

        <div class="skills-grid">
          <h3>{$t('about.mainSkills')}</h3>
          {#each skills as skill, index}
            <div
              class="skill-item"
              style="animation-delay: {index * 0.1}s"
              class:animate={isVisible}
            >
              <div class="skill-info">
                <span class="skill-name">{skill.name}</span>
                <span class="skill-percentage">{skill.level}%</span>
              </div>
              <div class="skill-bar">
                <div
                  class="skill-progress"
                  style="width: {isVisible ? skill.level : 0}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="about-visual">
        <div class="profile-card">
          <div class="profile-image">
            <img
              src="/profile.png"
              alt="Ricardo Soares"
              class="profile-photo"
            />
          </div>
          <div class="profile-info">
            <h3>{NAME}</h3>
            <p>{$t('about.role')}</p>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-number">{PROJECTS}</span>
                <span class="stat-label">{$t('about.projects')}</span>
              </div>
              <div class="stat">
                <span class="stat-number">{YEARS_OF_EXPERIENCE}</span>
                <span class="stat-label">{$t('about.years')}</span>
              </div>

              <!-- //Clients
              <div class="stat">
                <span class="stat-number">15+</span>
                <span class="stat-label">Clientes</span>
              </div>  -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="experience-timeline" class:animate={isVisible}>
      <h3>{$t('experience')}</h3>
      <div class="timeline">
        {#each experiences as exp, index}
          <div
            class="timeline-item"
            style="animation-delay: {index * 0.2}s"
            class:animate={isVisible}
          >
            <div class="timeline-year">{exp.year}</div>
            <div class="timeline-content">
              <h4>{exp.title}</h4>
              <p class="company">{exp.company}</p>
              <p class="description">{exp.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    padding: 8rem 0;
    background: var(--background-color);
    color: var(--text-color);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
  }

  .about-content.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 2rem;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .about-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .skills-grid {
    margin-top: 3rem;
  }

  .skills-grid h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  .skill-item {
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s ease;
  }

  .skill-item.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .skill-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .skill-name {
    font-weight: 600;
  }

  .skill-percentage {
    color: var(--primary-color);
    font-weight: 600;
  }

  .skill-bar {
    height: 8px;
    background: var(--background-color);
    border-radius: 4px;
    overflow: hidden;
  }

  .skill-progress {
    height: 100%;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border-radius: 4px;
    transition: width 1.5s ease;
  }

  .profile-card {
    background: var(--white-005);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    border: 1px solid var(--border-color);
  }

  .profile-image {
    margin-bottom: 1.5rem;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary-color);
    transition: transform 0.3s ease;
  }

  .profile-photo:hover {
    transform: scale(1.05);
  }

  .profile-info h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .profile-info p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  .profile-stats {
    display: flex;
    justify-content: space-around;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 900;
    color: var(--primary-color);
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .experience-timeline {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease 0.3s;
  }

  .experience-timeline.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .experience-timeline h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--primary-color);
  }

  .timeline {
    position: relative;
    padding-left: 2rem;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      var(--primary-color),
      var(--secondary-color)
    );
  }

  .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s ease;
  }

  .timeline-item.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    background: var(--primary-color);
    border-radius: 50%;
    transform: translateX(-50%);
  }

  .timeline-year {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .timeline-content h4 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  .company {
    color: var(--secondary-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .profile-stats {
      flex-direction: column;
      gap: 1rem;
    }

    .timeline {
      padding-left: 1rem;
    }

    .timeline-item::before {
      left: -1rem;
    }
  }
</style>
