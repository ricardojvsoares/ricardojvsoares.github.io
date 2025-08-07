<script>
  import { GMAIL, LOCALTION, NAME } from '$lib/data/constants';
  import { t } from '$lib/i18n';

  const currentYear = new Date().getFullYear();
  import { socialLinks } from '$lib/data/socials';

  const quickLinks = [
    { name: 'footer.links.about', href: '#sobre' },
    { name: 'footer.links.projects', href: '#projetos' },
    { name: 'footer.links.skills', href: '#skills' },
    { name: 'footer.links.contact', href: '#contacto' },
  ];
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-brand">
          <h3 class="brand-name">{NAME}</h3>
          <p class="brand-tagline">{$t('footer.tagline')}</p>
        </div>
        <p class="footer-description">
          {$t('footer.description')}
        </p>
      </div>

      <div class="footer-section">
        <h4 class="section-title">{$t('footer.quickLinks')}</h4>
        <ul class="footer-links">
          {#each quickLinks as link}
            <li>
              <a href={link.href} class="footer-link">
                {$t(link.name)}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="section-title">{$t('footer.connect')}</h4>
        <div class="social-links">
          {#each socialLinks as social}
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              title={social.name}
            >
              <span class="social-icon">{social.icon}</span>
            </a>
          {/each}
        </div>
        <div class="contact-info">
          <p class="contact-item">
            <span class="contact-icon">📧</span>
            <a href="mailto:{GMAIL}">{GMAIL}</a>
          </p>
          <p class="contact-item">
            <span class="contact-icon">📍</span>
            <span>{LOCALTION}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">
          © {currentYear}
          {NAME}
          {$t('footer.rights')}
        </p>
        <div class="footer-bottom-links">
          <a
            href="/pdf/privacy-policy.pdf"
            target="_blank"
            rel="noopener"
            class="footer-bottom-link"
          >
            {$t('footer.privacy')}
          </a>
          <a
            href="/pdf/terms-of-service.pdf"
            target="_blank"
            rel="noopener"
            class="footer-bottom-link"
          >
            {$t('footer.terms')}
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: linear-gradient(
      135deg,
      var(--background-color) 0%,
      var(--surface-color) 100%
    );
    color: white;
    padding: 4rem 0 0;
    margin-top: 4rem;
    border-top: 1px solid var(--border-color);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-section {
    display: flex;
    flex-direction: column;
  }

  .footer-brand {
    margin-bottom: 1rem;
  }

  .brand-name {
    font-size: 1.8rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    background: linear-gradient(
      45deg,
      var(--primary-color),
      var(--secondary-color)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .brand-tagline {
    color: var(--primary-color);
    font-weight: 600;
    margin: 0;
  }

  .footer-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  .section-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 0.8rem;
  }

  .footer-link {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
  }

  .footer-link:hover {
    color: var(--primary-color);
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: var(--white-005);
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .social-link:hover {
    background: var(--border-color);
    border-color: var(--border-color);
    transform: translateY(-2px);
  }

  .social-icon {
    font-size: 1.2rem;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin: 0;
  }

  .contact-item a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .contact-item a:hover {
    color: var(--primary-color);
  }

  .contact-icon {
    font-size: 1rem;
  }

  .footer-bottom {
    border-top: 1px solid var(--border-color);
    padding: 2rem 0;
  }

  .footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyright {
    color: var(--secondary-color);
    font-size: 0.9rem;
    margin: 0;
  }

  .footer-bottom-links {
    display: flex;
    gap: 2rem;
  }

  .footer-bottom-link {
    color: var(--secondary-color);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  .footer-bottom-link:hover {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }

    .footer-bottom-content {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .footer-bottom-links {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }

    .contact-info {
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    .footer {
      padding: 2rem 0 0;
    }

    .container {
      padding: 0 1rem;
    }

    .footer-bottom-links {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>
