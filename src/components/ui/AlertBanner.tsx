import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import actualitesData from '@/data/actualites.json';
import type { Actualite } from '@/types';
import { isDateWithinRange } from '@/utils/date';

const actualites = actualitesData as Actualite[];

/**
 * Bandeau d'alerte sanitaire (choléra, inondations…) affiché en haut du
 * Header tant que la date système se situe dans la fenêtre [date, alert_end_date]
 * d'une actualité marquée `is_alert: true`. Le message défile en ticker
 * horizontal (pause au survol, désactivé si `prefers-reduced-motion`).
 */
export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);

  const activeAlert = actualites.find(
    (a) => a.is_alert && a.alert_end_date && isDateWithinRange(a.date, a.alert_end_date),
  );

  if (!activeAlert || dismissed) return null;

  const message = `⚠️ ${activeAlert.title}. ${activeAlert.excerpt}`;

  return (
    <div role="alert" aria-live="polite" className="alert-ticker-wrapper">
      <div className="alert-ticker-track">
        {/* Le message est répété une fois dans le flux pour que le défilement
            reste continu tant que l'utilisateur ne l'a pas lu en entier. */}
        <span className="alert-ticker-content">
          {message}
          &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;
          {message}
        </span>
      </div>
      <Link to={`/actualites/${activeAlert.slug}`} className="alert-ticker-link">
        En savoir plus →
      </Link>
      <button type="button" aria-label="Fermer l'alerte" onClick={() => setDismissed(true)} className="alert-ticker-close">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
