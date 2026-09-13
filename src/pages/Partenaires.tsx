import { Handshake } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import partenairesData from '@/data/partenaires.json';
import type { Partenaire } from '@/types';

const partenaires = partenairesData as Partenaire[];

export function Partenaires() {
  return (
    <>
      <SeoHead
        title="Partenaires"
        description="Les partenaires techniques et financiers de la Commune du 6ᵉ arrondissement de N'Djaména : Union européenne, AFD, OMS."
        path="/partenaires"
      />
      <PageHeader eyebrow="Coopération" title="Nos partenaires" description="Institutions et bailleurs qui accompagnent le développement de la commune." />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {partenaires.map((p) => (
            <article key={p.id} className="flex flex-col gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-8">
              <div className="flex items-center gap-3">
                <Handshake size={24} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
                <h2 className="text-h4">{p.name}</h2>
              </div>
              <p className="text-body text-[color:var(--color-text-secondary)]">{p.description}</p>
              <dl className="grid grid-cols-2 gap-3 text-small">
                {p.project && (
                  <div>
                    <dt className="text-caption text-[color:var(--color-text-muted)]">Projet</dt>
                    <dd>{p.project}</dd>
                  </div>
                )}
                {p.period && (
                  <div>
                    <dt className="text-caption text-[color:var(--color-text-muted)]">Période</dt>
                    <dd>{p.period}</dd>
                  </div>
                )}
              </dl>
              <ReliabilityBadge level={p.verification} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
