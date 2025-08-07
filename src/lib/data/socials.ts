import { GITHUB, INSTAGRAM, LINKED_IN } from './constants';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: '🐙',
    url: GITHUB,
    color: '#333',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: LINKED_IN,
    color: '#0077b5',
  },
  {
    name: 'Instagram',
    icon: '📷',
    url: INSTAGRAM,
    color: '#e4405f',
  },

  {
    name: 'Twitter',
    icon: '🐦',
    url: 'TWITTER',
    color: '#1da1f2',
  },
];
