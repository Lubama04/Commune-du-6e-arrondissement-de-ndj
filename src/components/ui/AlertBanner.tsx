import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, X } from 'lucide-react';
import actualitesData from '@/data/actualites.json';
import type { Actualite } from '@/types';
import { isDateWithinRange } from '@/utils/date';

const actualites = actualitesData as Actualite[];

/**
 * Bandeau d'alerte sanitaire (choléra, inondations…) affiché en haut du
 * Header tant que la date système se situe dans la fenêtre [date, alert_end_date]
 * d'une actualité marquée `is_alert: true`.
 */
export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);

  const activeAlert = actualites.find(
    (a) => a.is_alert && a.alert_end_date && isDateWithinRange(a.date, a.alert_end_date),
  );

  if (!activeAlert || dismissed) return null;

  return (
    <div role="alert" aria-live="polite" className="bg-[color:var(--color-error)] text-white">
      <div className="mx-auto flex max-w-(--max-width-content) items-center gap-3 px-4 py-2.5 text-small">
        <AlertTriangle size={18} className="shrink-0" aria-hidden="true" />
        <p className="flex-1">
          <strong className="font-semibold">{activeAlert.title}.</strong>{' '}
          <span className="hidden sm:inline">{activeAlert.excerpt}</span>{' '}
          <Link to={`/actualites/${activeAlert.slug}`} className="underline underline-offset-2 hover:no-underline">
            En savoir plus →
          </Link>
        </p>
        <button
          type="button"
          aria-label="Fermer l'alerte"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded p-1 hover:bg-white/15"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
