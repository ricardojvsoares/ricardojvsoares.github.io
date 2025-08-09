interface Project {
  id: number;
  titleKey: string; // i18n key for title
  descriptionKey: string; // i18n key for description
  image: string;
  technologies: string[];
  category: 'fullstack' | 'frontend' | 'backend';
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    titleKey: 'projects.items.portfolio.title',
    descriptionKey: 'projects.items.portfolio.description',
    image: '💻',
    technologies: ['Svelte', 'SvelteKit', 'TypeScript', 'HTML5', 'CSS'],
    category: 'frontend',
    github: 'https://github.com/ricardojvsoares/svelte-kit-portfolio',
    featured: true,
  },
  {
    id: 2,
    titleKey: 'projects.items.powerBi.title',
    descriptionKey: 'projects.items.powerBi.description',
    image: '📊',
    technologies: ['TypeScript', 'PowerBI', 'DaxStudio', 'DAX', 'SQL'],
    category: 'frontend',
    github: 'https://github.com/ricardojvsoares/Sunviauto_Project',
    featured: true,
  },
  {
    id: 3,
    titleKey: 'projects.items.motomania.title',
    descriptionKey: 'projects.items.motomania.description',
    image: '🕹️',
    technologies: [
      'Svelte',
      'SvelteKit',
      'TypeScript',
      'HTML5',
      'CSS',
      'PostMan',
      'Pixi.js',
    ],
    category: 'frontend',
    featured: true,
  },
  {
    id: 4,
    titleKey: 'projects.items.bedRest.title',
    descriptionKey: 'projects.items.bedRest.description',
    image: '🛏️',
    technologies: ['JavaScript', 'TypeScript', 'HTML5', 'CSS'],
    category: 'frontend',
    github:
      'https://github.com/ricardojvsoares/BedRest_HospitalBedManagementSystem',
    featured: true,
  },
];
