import type { ReliabilityLevel } from '@/types';

export interface ReliabilityConfig {
  label: string;
  color: string;
  description: string;
}

/** Mappe chaque niveau de fiabilité à son libellé, sa couleur token et son explication. */
export const RELIABILITY_CONFIG: Record<ReliabilityLevel, ReliabilityConfig> = {
  verifie: {
    label: 'Vérifié',
    color: 'var(--color-verifie)',
    description: 'Donnée confirmée par une source officielle ou institutionnelle.',
  },
  a_confirmer: {
    label: 'À confirmer',
    color: 'var(--color-a-confirmer)',
    description: "Donnée reprise d'une source disponible mais non validée officiellement.",
  },
  non_trouve: {
    label: 'Non trouvé',
    color: 'var(--color-non-trouve)',
    description: 'Aucune source publique disponible à ce jour.',
  },
};
