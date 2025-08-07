# SvelteKit Portfolio Deployment Guide

This document provides detailed instructions for deploying your SvelteKit portfolio on various platforms.

## Prerequisites

- Node.js 18+ installed
- GitHub account
- Project tested locally

## Deployment Options

### 1. Vercel (Recommended)

Vercel offers native integration with SvelteKit and automatic deployment.

#### Steps:

1. **Connect to GitHub:**
   - Visit [vercel.com](https://vercel.com)
   - Log in with your GitHub account
   - Click "New Project"

2. **Import Repository:**
   - Select your portfolio repository
   - Vercel will automatically detect it as a SvelteKit project

3. **Configure Build:**

   ```bash
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

4. **Deploy:**
   - Click "Deploy"
   - The site will be live in a few minutes

#### Advantages:

- Automatic deployment on every push
- Free HTTPS
- Global CDN
- Preview deployments for PRs

### 2. Netlify

Another great option for static sites.

#### Steps:

1. **Connect Repository:**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account

2. **Configure Build:**

   ```bash
   Build command: npm run build
   Publish directory: build
   ```

3. **Deploy:**
   - Click "Deploy site"

#### Advantages:

- Free forms
- Serverless functions
- Split testing

### 3. GitHub Pages

For free deployment directly from GitHub.

#### Configuration:

1. **Install gh-pages:**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json:**

   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d build"
     }
   }
   ```

3. **Configure adapter:**

   ```bash
   npm install --save-dev @sveltejs/adapter-static
   ```

4. **Update svelte.config.js:**

   ```javascript
   import adapter from '@sveltejs/adapter-static';

   export default {
     kit: {
       adapter: adapter({
         pages: 'build',
         assets: 'build',
         fallback: null,
       }),
       paths: {
         base: '/repository-name',
       },
     },
   };
   ```

5. **Deploy:**

   ```bash
   npm run deploy
   ```

### 4. Railway

For deployment with backend if needed.

#### Steps:

1. **Connect to GitHub:**
   - Visit [railway.app](https://railway.app)
   - Connect your GitHub account

2. **Create Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"

3. **Configure:**
   - Railway will automatically detect SvelteKit
   - Build will run automatically

## Specific Configurations

### Environment Variables

If your project uses environment variables:

```bash
# .env.example
VITE_API_URL=https://api.example.com
VITE_CONTACT_EMAIL=contact@example.com
```

### Production Optimizations

1. **Font Preloading:**

   ```html
   <link
     rel="preload"
     href="/fonts/font.woff2"
     as="font"
     type="font/woff2"
     crossorigin
   />
   ```

2. **SEO Meta Tags:**

   ```html
   <meta
     name="description"
     content="Portfolio of Ricardo Soares - Full Stack Developer"
   />
   <meta property="og:title" content="Ricardo Soares - Full Stack | Game Dev" />
   <meta
     property="og:description"
     content="Professional portfolio showcasing projects and skills"
   />
   ```

3. **Sitemap:**

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yourdomain.com/</loc>
       <lastmod>2025-01-01</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

## Monitoring

### Analytics

Add Google Analytics:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance

Tools to monitor performance:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## Security

### Security Headers

Add to `app.html`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline';"
/>
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="DENY" />
```

## Automatic Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Final Checklist

Before deployment, verify:

- [ ] All images are optimized
- [ ] External links open in new tab
- [ ] Contact form works
- [ ] Site is responsive on all devices
- [ ] Performance score > 90 in Lighthouse
- [ ] SEO score > 90 in Lighthouse
- [ ] Accessibility score > 90 in Lighthouse
- [ ] Favicon is configured
- [ ] Meta tags are complete
- [ ] README.md is updated

## Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check if all dependencies are installed
   - Verify no TypeScript errors

2. **Images not loading:**
   - Ensure they are in the `static/` folder
   - Check relative paths

3. **Form not working:**
   - Configure backend service (Netlify Forms, Formspree, etc.)

## Support

For deployment questions:

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

---

**Congratulations!** Your portfolio is ready for the world!
