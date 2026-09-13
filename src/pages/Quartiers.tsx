import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import quartiersData from '@/data/quartiers.json';
import type { Quartier } from '@/types';

const quartiers = quartiersData as Quartier[];

export function Quartiers() {
  return (
    <>
      <SeoHead
        title="Quartiers"
        description="Découvrez les quartiers de Moursal et Paris-Congo qui composent la Commune du 6ᵉ Arrondissement de N'Djaména."
        path="/quartiers"
      />
      <PageHeader
        eyebrow="Territoire"
        title="Les quartiers"
        description="La commune compte 2 quartiers, organisés en 27 carrés."
      />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {quartiers.map((q) => (
            <article
              key={q.id}
              className="flex flex-col gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-8"
            >
              <div className="flex items-center gap-3">
                <MapPin size={22} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
                <h2 className="text-h3">
                  <Link to={`/quartiers/${q.slug}`} className="hover:text-[color:var(--color-brand-secondary)]">
                    {q.name}
                  </Link>
                </h2>
              </div>
              <p className="text-body text-[color:var(--color-text-secondary)]">{q.description}</p>
              <div className="flex items-center justify-between pt-2">
                <ReliabilityBadge level={q.verification} />
                <Link
                  to={`/quartiers/${q.slug}`}
                  className="inline-flex items-center gap-1 text-small font-semibold text-[color:var(--color-brand-primary)]"
                >
                  En savoir plus <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
