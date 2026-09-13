import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, History, Building2 } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import quartiersData from '@/data/quartiers.json';
import type { Quartier } from '@/types';

const quartiers = quartiersData as Quartier[];

export function QuartierDetail() {
  const { slug } = useParams<{ slug: string }>();
  const quartier = quartiers.find((q) => q.slug === slug);

  if (!quartier) return <Navigate to="/quartiers" replace />;

  return (
    <>
      <SeoHead
        title={quartier.name}
        description={quartier.description}
        path={`/quartiers/${quartier.slug}`}
      />
      <PageHeader eyebrow="Quartier" title={quartier.name} description={quartier.description} />

      <section className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <Link to="/quartiers" className="mb-8 inline-flex items-center gap-2 text-small font-semibold text-[color:var(--color-brand-primary)]">
          <ArrowLeft size={16} aria-hidden="true" /> Tous les quartiers
        </Link>

        <div className="flex items-center gap-3">
          <History size={22} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
          <h2 className="text-h3">Histoire</h2>
          <ReliabilityBadge level={quartier.history_verification} />
        </div>
        <p className="text-body mt-4 text-[color:var(--color-text-secondary)]">{quartier.history}</p>

        {quartier.population_note && (
          <p className="text-small mt-4 italic text-[color:var(--color-text-muted)]">{quartier.population_note}</p>
        )}

        {quartier.equipements_notables && quartier.equipements_notables.length > 0 && (
          <>
            <CanalSeparator align="left" tight />
            <div className="flex items-center gap-3">
              <Building2 size={22} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
              <h2 className="text-h3">Équipements notables</h2>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {quartier.equipements_notables.map((eq) => (
                <li
                  key={eq}
                  className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-4 text-body"
                >
                  {eq}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
