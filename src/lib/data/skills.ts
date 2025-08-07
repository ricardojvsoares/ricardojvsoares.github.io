interface Skill {
  name: string;
  level: number;
  icon?: string; // Iconify or SVG key
}

interface Category {
  title: string;
  icon?: string; // Iconify or SVG key
  skills: Skill[];
}

export const skills: Skill[] = [
  { name: 'JavaScript/TypeScript', level: 90 },
  { name: 'Design UI/UX', level: 90 },
  { name: 'Svelte/SvelteKit', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'C#', level: 60 },
];

export const skillCategories: Record<string, Category> = {
  frontend: {
    title: 'Frontend Development',
    skills: [
      {
        name: 'Svelte',
        level: 85,
        icon: '/icons/Svelte.png',
      },
      {
        name: 'TypeScript',
        level: 90,
        icon: '/icons/TypeScript.png',
      },
      {
        name: 'JavaScript',
        level: 90,
        icon: '/icons/JavaScript.png',
      },
      {
        name: 'CSS3',
        level: 90,
        icon: '/icons/CSS3.png',
      },
      {
        name: 'HTML5',
        level: 90,
        icon: '/icons/HTML5.png',
      },
      {
        name: 'Tailwind CSS',
        level: 85,
        icon: '/icons/Tailwind CSS.png',
      },
      {
        name: 'Vite.js',
        level: 80,
        icon: '/icons/Vite.js.png',
      },
    ],
  },
  backend: {
    title: 'Backend Development',
    skills: [
      {
        name: 'C#',
        level: 60,
        icon: '/icons/CSharp.png',
      },
      {
        name: 'Postman',
        level: 85,
        icon: '/icons/Postman.png',
      },
      {
        name: 'Node.js',
        level: 75,
        icon: '/icons/Node.js.png',
      },
      {
        name: 'Microsoft SQL Server',
        level: 75,
        icon: '/icons/Microsoft SQL Server.png',
      },
    ],
  },
  tools: {
    title: 'Tools & DevOps',
    skills: [
      {
        name: 'Git',
        level: 95,
        icon: '/icons/Git.png',
      },
      {
        name: 'GitHub',
        level: 90,
        icon: '/icons/GitHub.png',
      },
      {
        name: 'GitLab',
        level: 80,
        icon: '/icons/GitLab.png',
      },
      {
        name: 'Vercel',
        level: 90,
        icon: '/icons/Vercel.png',
      },
      {
        name: 'Unity',
        level: 75,
        icon: '/icons/Unity.png',
      },
      {
        name: 'VS Code',
        level: 95,
        icon: '/icons/VSCode.png',
      },
      {
        name: 'Figma',
        level: 85,
        icon: '/icons/Figma.png',
      },
      {
        name: 'Blender',
        level: 70,
        icon: '/icons/Blender.png',
      },
    ],
  },
};
