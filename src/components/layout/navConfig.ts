export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'La Commune', to: '/la-commune' },
  { label: 'Gouvernance', to: '/gouvernance' },
  { label: 'Quartiers', to: '/quartiers' },
  { label: 'Services', to: '/services' },
  { label: 'Projets & PDC', to: '/projets' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Contact', to: '/contact' },
];
