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
    titleKey: 'projects.items.ecommerce.title',
    descriptionKey: 'projects.items.ecommerce.description',
    image: '🛒',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: 2,
    titleKey: 'projects.items.taskManagement.title',
    descriptionKey: 'projects.items.taskManagement.description',
    image: '📋',
    technologies: [
      'Svelte',
      'SvelteKit',
      'TypeScript',
      'HTML5',
      'CSS',
      'PostMan',
    ],
    category: 'frontend',
    demo: 'https://demo.com',
    featured: true,
  },
];
