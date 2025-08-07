# SvelteKit Portfolio - Full Stack Developer

A modern and professional portfolio built with SvelteKit, featuring responsive design, light/dark themes, multi-language support, and advanced animations.

## Features

### Modern Design

- **Light/Dark Theme**: Smooth toggle with preference persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Fluid Animations**: Elegant micro-interactions and transitions
- **Vibrant Gradients**: Modern color palette (#00ff88, #4ecdc4)

### Multi-language (i18n)

- **Portuguese (Portugal)** and **English**
- **Automatic Detection**: Browser language detected automatically
- **Persistence**: Language preference saved in localStorage
- **Complete Translations**: All content translated

### Site Sections

- **Hero**: Dynamic text animation with floating elements
- **About**: Professional profile, skills, experience timeline
- **Projects**: Interactive grid with category filters
- **Skills**: Organized categories with interactive visualization
- **Contact**: Functional form with validation
- **Footer**: Social links, contact info, and quick navigation

### Advanced Features

- **Smooth Navigation**: Seamless scrolling between sections
- **Dynamic Filters**: Filterable projects by category
- **Interactive Form**: Validation and visual feedback
- **Optimized Performance**: Lighthouse score 95+
- **SEO Friendly**: Optimized meta tags and structure

## Technologies

- **SvelteKit** - Main framework
- **TypeScript** - Static typing
- **CSS3** - Advanced animations and layouts
- **Vite** - Build tool and dev server
- **i18n** - Custom internationalization system

## How to Use

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio-sveltekit.git
cd portfolio-sveltekit

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Starts development server

# Build
npm run build        # Generates production build
npm run preview      # Previews production build

# Linting
npm run check        # Checks TypeScript types
```

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable components
│   │   ├── Navigation.svelte
│   │   ├── About.svelte
│   │   ├── Projects.svelte
│   │   ├── Skills.svelte
│   │   ├── Contact.svelte
│   │   ├── Footer.svelte
│   │   ├── ThemeToggle.svelte
│   │   └── LanguageToggle.svelte
│   ├── data/               # Data to populate the portfolio
│   ├── i18n/               # Internationalization system
│   │   ├── index.js        # Main i18n logic
│   │   └── locales/        # Translation files
│   │       ├── pt.json     # Portuguese
│   │       └── en.json     # English
│   └── stores/             # Svelte stores
│       └── theme.js        # Theme store
├── routes/                 # Application routes
│   ├── +layout.svelte      # Main layout
│   └── +page.svelte        # Home page
├── app.css                 # Global styles
└── app.html                # Base HTML template
```

## Customization

### Themes

Themes are controlled by CSS variables in `variables.css`:

```css
:root[data-theme='light'] {
  --primary-color: #00ff88;
  --background-color: #ffffff;
  --text-color: #212529;
  /* ... */
}

:root[data-theme='dark'] {
  --primary-color: #00ff88;
  --background-color: #0a0a0a;
  --text-color: #ffffff;
  /* ... */
}
```

### Translations

Add new translations in JSON files in `src/lib/i18n/locales/`:

```json
{
  "nav": {
    "portfolio": "Portfolio",
    "about": "About"
  }
}
```

Use in components:

```svelte
<script>
  import { t } from '$lib/i18n';
</script>

<h1>{$t('nav.portfolio')}</h1>
```

### Add New Language

1. Create translation file: `src/lib/i18n/locales/fr.json`
2. Add to system: `src/lib/i18n/index.js`
3. Update component: `LanguageToggle.svelte`

## Responsiveness

The site is fully responsive with breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Automatic deployment on every push
3. HTTPS and CDN included

### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `build`

### GitHub Pages

```bash
npm install --save-dev @sveltejs/adapter-static
npm run build
npm run deploy
```

See `DEPLOYMENT.md` for detailed instructions.

## Configuration

### Adapter

The project uses `@sveltejs/adapter-auto` by default. For specific deployment:

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter(),
  },
};
```

## Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Contribution

1. Fork the project
2. Create a branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -m 'Add new feature'`
4. Push: `git push origin feature/new-feature`
5. Open a Pull Request

## License

This project is under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: geral.ricardosoares@gmail.com
- **LinkedIn**: [linkedin.com/in/ricardojvsoares](https://www.linkedin.com/in/ricardojvsoares)
- **GitHub**: [github.com/ricardojvsoares](https://github.com/ricardojvsoares)

---

**If you like the project, please leave a star!**
