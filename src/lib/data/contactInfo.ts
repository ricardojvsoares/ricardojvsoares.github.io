import { GMAIL, LOCALTION } from './constants';

interface contactInfo {
  icon: string;
  title: string;
  value: string;
  link: string | null;
}

export const contactInfos: contactInfo[] = [
  {
    icon: '📧',
    title: 'Email',
    value: GMAIL,
    link: `mailto:${GMAIL}`,
  },
  {
    icon: '📍',
    title: 'Localização',
    value: LOCALTION,
    link: null,
  },
];
