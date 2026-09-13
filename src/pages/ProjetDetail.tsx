import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Users, CalendarDays } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { formatDateFr, formatFcfa } from '@/utils/date';
import projetsData from '@/data/projets.json';
import type { Projet } from '@/types';

const projets = projetsData as Projet[];

const STATUS_LABEL: Record<Projet['status'], string> = {
  en_cours: 'En cours',
  realise: 'Réalisé',
  planifie: 'Planifié',
};

export function ProjetDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projet = projets.find((p) => p.slug === slug);

  if (!projet) return <Navigate to="/projets" replace />;

  return (
    <>
      <SeoHead title={projet.title} description={projet.description} path={`/projets/${projet.slug}`} />
      <PageHeader eyebrow={STATUS_LABEL[projet.status]} title={projet.title} description={projet.description} />

      <section className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <Link to="/projets" className="mb-8 inline-flex items-center gap-2 text-small font-semibold text-[color:var(--color-brand-primary)]">
          <ArrowLeft size={16} aria-hidden="true" /> Tous les projets
        </Link>

        {typeof projet.advancement_pct === 'number' && (
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-small text-[color:var(--color-text-secondary)]">
              <span>Avancement des travaux</span>
              <span>{projet.advancement_pct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-[color:var(--color-surface-muted)]">
              <div className="h-full rounded-full bg-[color:var(--color-accent)]" style={{ width: `${projet.advancement_pct}%` }} />
            </div>
            {projet.advancement_date && (
              <p className="text-small mt-2 text-[color:var(--color-text-muted)]">
                Situation au {formatDateFr(projet.advancement_date)}
                {projet.advancement_source && ` — ${projet.advancement_source}`}
              </p>
            )}
          </div>
        )}

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
            <Wallet size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <div>
              <dt className="text-caption text-[color:var(--color-text-muted)]">Budget</dt>
              <dd className="text-body">{formatFcfa(projet.budget_fcfa)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
            <Users size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <div>
              <dt className="text-caption text-[color:var(--color-text-muted)]">Financeur</dt>
              <dd className="text-body">{projet.funder}</dd>
            </div>
          </div>
          {projet.start_date && (
            <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
              <CalendarDays size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
              <div>
                <dt className="text-caption text-[color:var(--color-text-muted)]">Démarrage</dt>
                <dd className="text-body">{formatDateFr(projet.start_date)}</dd>
              </div>
            </div>
          )}
          {projet.beneficiaries && (
            <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
              <Users size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
              <div>
                <dt className="text-caption text-[color:var(--color-text-muted)]">Bénéficiaires</dt>
                <dd className="text-body">{projet.beneficiaries}</dd>
              </div>
            </div>
          )}
        </dl>

        {projet.quartiers && projet.quartiers.length > 0 && (
          <p className="text-small mt-6 text-[color:var(--color-text-secondary)]">
            Quartiers concernés : <strong>{projet.quartiers.join(', ')}</strong>
          </p>
        )}

        <div className="mt-6">
          <ReliabilityBadge level={projet.verification} source={projet.funder} date={projet.advancement_date} />
        </div>
      </section>
    </>
  );
}
