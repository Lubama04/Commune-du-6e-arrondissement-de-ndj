import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import type { ReliabilityLevel } from '@/types';
import { RELIABILITY_CONFIG } from '@/utils/reliability';

const ICONS: Record<ReliabilityLevel, typeof CheckCircle2> = {
  verifie: CheckCircle2,
  a_confirmer: AlertCircle,
  non_trouve: HelpCircle,
};

interface ReliabilityBadgeProps {
  level: ReliabilityLevel;
  source?: string;
  date?: string;
  className?: string;
}

/**
 * Badge de transparence institutionnelle affiché sur toute donnée sensible
 * (statistiques, coordonnées, identité des élus, équipements).
 */
export function ReliabilityBadge({ level, source, date, className = '' }: ReliabilityBadgeProps) {
  const config = RELIABILITY_CONFIG[level];
  const Icon = ICONS[level];
  const title = [config.description, source && `Source : ${source}`, date && `Date : ${date}`]
    .filter(Boolean)
    .join(' — ');

  return (
    <span
      className={`group relative inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-caption normal-case tracking-normal ${className}`}
      style={{ borderColor: config.color, color: config.color }}
      tabIndex={0}
    >
      <Icon size={13} aria-hidden="true" strokeWidth={2.5} />
      <span>{config.label}</span>
      {(source || date) && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-64 -translate-x-1/2 rounded-md bg-[color:var(--color-surface-dark)] px-3 py-2 text-xs font-normal normal-case tracking-normal text-[color:var(--color-text-inverse)] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {title}
        </span>
      )}
    </span>
  );
}
