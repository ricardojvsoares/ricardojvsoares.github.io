interface Filter {
  id: 'all' | 'fullstack' | 'frontend' | 'backend';
  labelKey: string; // i18n key for filter label
}

export const filters: Filter[] = [
  { id: 'all', labelKey: 'projects.filters.all' },
  { id: 'fullstack', labelKey: 'projects.filters.fullstack' },
  { id: 'frontend', labelKey: 'projects.filters.frontend' },
  { id: 'backend', labelKey: 'projects.filters.backend' },
];
