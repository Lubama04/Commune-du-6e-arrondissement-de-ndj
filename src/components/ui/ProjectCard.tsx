import { Link } from 'react-router-dom';
import { ArrowRight, HardHat } from 'lucide-react';
import type { Projet } from '@/types';
import { formatFcfa } from '@/utils/date';
import { ReliabilityBadge } from './ReliabilityBadge';

const STATUS_LABEL: Record<Projet['status'], string> = {
  en_cours: 'En cours',
  realise: 'Réalisé',
  planifie: 'Planifié',
};

const STATUS_COLOR: Record<Projet['status'], string> = {
  en_cours: 'var(--color-a-confirmer)',
  realise: 'var(--color-verifie)',
  planifie: 'var(--color-info)',
};

export function ProjectCard({ projet }: { projet: Projet }) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6">
      <div className="flex items-start justify-between gap-3">
        <HardHat size={24} className="shrink-0 text-[color:var(--color-brand-secondary)]" strokeWidth={1.75} aria-hidden="true" />
        <span
          className="text-caption rounded-full px-2.5 py-1 normal-case tracking-normal text-white"
          style={{ background: STATUS_COLOR[projet.status] }}
        >
          {STATUS_LABEL[projet.status]}
        </span>
      </div>
      <h3 className="text-h4">
        <Link to={`/projets/${projet.slug}`} className="hover:text-[color:var(--color-brand-secondary)]">
          {projet.title}
        </Link>
      </h3>
      <p className="text-small flex-1 text-[color:var(--color-text-secondary)]">{projet.description}</p>

      {typeof projet.advancement_pct === 'number' && (
        <div>
          <div className="mb-1 flex justify-between text-small text-[color:var(--color-text-muted)]">
            <span>Avancement</span>
            <span>{projet.advancement_pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-muted)]">
            <div
              className="h-full rounded-full bg-[color:var(--color-accent)]"
              style={{ width: `${projet.advancement_pct}%` }}
            />
          </div>
        </div>
      )}

      <dl className="text-small grid grid-cols-2 gap-2 text-[color:var(--color-text-secondary)]">
        <div>
          <dt className="text-caption text-[color:var(--color-text-muted)]">Financeur</dt>
          <dd>{projet.funder}</dd>
        </div>
        {projet.budget_fcfa !== null && (
          <div>
            <dt className="text-caption text-[color:var(--color-text-muted)]">Budget</dt>
            <dd>{formatFcfa(projet.budget_fcfa)}</dd>
          </div>
        )}
      </dl>

      <div className="flex items-center justify-between pt-2">
        <ReliabilityBadge level={projet.verification} source={projet.funder} />
        <Link
          to={`/projets/${projet.slug}`}
          className="inline-flex items-center gap-1 text-small font-semibold text-[color:var(--color-brand-primary)]"
        >
          Détails <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
