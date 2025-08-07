<script lang="ts">
  import { socialLinks } from '$lib/data/socials';
  import { contactInfos } from '$lib/data/contactInfo';
  import { t } from '$lib/i18n';

  let sectionElement: HTMLElement | null = $state(null);
  let isVisible: boolean = $state(false);
  let formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  } = $state({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  let isSubmitting: boolean = $state(false);
  let submitStatus: 'success' | 'error' | null = $state(null);

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

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    isSubmitting = true;
    submitStatus = null;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        submitStatus = 'success';
        formData = { name: '', email: '', subject: '', message: '' };
      } else {
        submitStatus = 'error';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      submitStatus = 'error';
    } finally {
      isSubmitting = false;
      setTimeout(() => {
        submitStatus = null;
      }, 5000);
    }
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  let isFormValid = $derived(
    formData.name.trim() &&
      validateEmail(formData.email) &&
      formData.subject.trim() &&
      formData.message.trim()
  );
</script>

<section id="contacto" class="contact-section" bind:this={sectionElement}>
  <div class="container">
    <div class="section-header" class:animate={isVisible}>
      <h2 class="section-title">{$t('contact.title')}</h2>
      <p class="section-subtitle">
        {$t('contact.subtitle')}
      </p>
    </div>

    <div class="contact-content" class:animate={isVisible}>
      <div class="contact-info">
        <h3 class="info-title">{$t('contact.info.title')}</h3>
        <p class="info-description">
          {$t('contact.info.description')}
        </p>

        <div class="contact-details">
          {#each contactInfos as info, index}
            <div
              class="contact-item"
              style="animation-delay: {index * 0.1}s"
              class:animate={isVisible}
            >
              <span class="contact-icon">{info.icon}</span>
              <div class="contact-text">
                <h4>{info.title}</h4>
                {#if info.link}
                  <a href={info.link} target="_blank" rel="noopener">
                    {info.value}
                  </a>
                {:else}
                  <span>{info.value}</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>

        <div class="social-links">
          <h4>{$t('contact.social.title')}</h4>
          <div class="social-grid">
            {#each socialLinks as social, index}
              <a
                href={social.url}
                target="_blank"
                rel="noopener"
                class="social-link"
                style="animation-delay: {index * 0.1}s"
                class:animate={isVisible}
              >
                <span class="social-icon">{social.icon}</span>
                <span class="social-name">{social.name}</span>
              </a>
            {/each}
          </div>
        </div>
      </div>

      <div class="contact-form-container">
        <form class="contact-form" onsubmit={handleSubmit}>
          <h3 class="form-title">{$t('contact.form.title')}</h3>

          {#if submitStatus === 'success'}
            <div class="status-message success">
              {$t('contact.form.success')}
            </div>
          {:else if submitStatus === 'error'}
            <div class="status-message error">
              {$t('contact.form.error')}
            </div>
          {/if}

          <div class="form-row">
            <div class="form-group">
              <label for="name">{$t('contact.form.placeholders.name')}</label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                required
                placeholder={$t('contact.form.placeholders.name')}
              />
            </div>

            <div class="form-group">
              <label for="email">{$t('contact.form.placeholders.email')}</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                required
                placeholder={$t('contact.form.placeholders.email')}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="subject"
              >{$t('contact.form.placeholders.subject')}</label
            >
            <input
              type="text"
              id="subject"
              bind:value={formData.subject}
              required
              placeholder={$t('contact.form.placeholders.subject')}
            />
          </div>

          <div class="form-group">
            <label for="message"
              >{$t('contact.form.placeholders.message')}</label
            >
            <textarea
              id="message"
              bind:value={formData.message}
              required
              placeholder={$t('contact.form.placeholders.message')}
              rows="2"
            ></textarea>
          </div>

          <button
            type="submit"
            class="submit-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {#if isSubmitting}
              <span class="loading-spinner"></span>
              {$t('contact.form.sending')}
            {:else}
              {$t('contact.form.send')}
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  .contact-section {
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

  .contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease 0.2s;
  }

  .contact-content.animate {
    opacity: 1;
    transform: translateY(0);
  }

  .info-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .info-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .contact-details {
    margin-bottom: 3rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.6s ease;
  }

  .contact-item.animate {
    opacity: 1;
    transform: translateX(0);
  }

  .contact-icon {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--border-color);
    border-radius: 50%;
    border: 1px solid var(--border-color);
  }

  .contact-text h4 {
    color: var(--primary-color);
    margin-bottom: 0.3rem;
    font-weight: 600;
  }

  .contact-text a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .contact-text a:hover {
    color: var(--primary-color);
  }

  .contact-text span {
    color: var(--text-secondary);
  }

  .social-links h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .social-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    background: var(--white-005);
    border-radius: 10px;
    text-decoration: none;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
  }

  .social-link:hover {
    color: var(--primary-color);
    border-color: var(--border-color);
    transform: translateY(-2px);
  }

  .social-icon {
    font-size: 1.2rem;
  }

  .contact-form-container {
    background: var(--white-005);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid var(--border-color);
  }

  .form-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  .status-message {
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .status-message.success {
    background: var(--border-color);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
  }

  .status-message.error {
    background: var(--black-005);
    color: var(--color-error);
    border: var(--border-color);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
    font-weight: 600;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 1rem;
    background: var(--white-005);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: var(--box-shadow);
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--secondary-color);
  }

  .submit-btn {
    width: 100%;
    padding: 1rem 2rem;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    border: none;
    border-radius: 10px;
    color: var(--background-color);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--background-color);
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .contact-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .social-grid {
      grid-template-columns: 1fr;
    }

    .section-title {
      font-size: 2rem;
    }
  }
</style>
