import { ScrollText, Compass, Landmark } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { MapEmbed } from '@/components/ui/MapEmbed';
import commune from '@/data/commune.json';
import type { Commune } from '@/types';

const data = commune as Commune;

export function LaCommune() {
  return (
    <>
      <SeoHead
        title="La Commune"
        description="Présentation de la Commune du 6ᵉ Arrondissement de N'Djaména : territoire, limites administratives et textes fondateurs."
        path="/la-commune"
      />
      <PageHeader eyebrow="Présentation" title="La Commune" description={data.status} />

      <section className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <p className="text-body text-[color:var(--color-text-secondary)]">{data.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ReliabilityBadge level={data.area_verification} source={data.area_source} />
          <ReliabilityBadge level={data.population_verification} source={data.population_source} />
        </div>
        {data.population_note && (
          <p className="text-small mt-3 italic text-[color:var(--color-text-muted)]">{data.population_note}</p>
        )}
      </section>

      <CanalSeparator />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Compass size={24} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
          <h2>Limites administratives</h2>
          <ReliabilityBadge level={data.boundaries_verification} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Nord', data.boundaries.north],
            ['Sud', data.boundaries.south],
            ['Est', data.boundaries.east],
            ['Ouest', data.boundaries.west],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
              <div className="text-caption text-[color:var(--color-accent-hover)]">{label}</div>
              <div className="text-body mt-1">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <CanalSeparator />

      <section className="bg-[color:var(--color-surface-muted)] py-16">
        <div className="mx-auto max-w-(--max-width-content) px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Landmark size={24} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <h2>Localisation</h2>
          </div>
          <MapEmbed />
          <p className="text-small mt-3 text-[color:var(--color-text-muted)]">
            {data.coordinates.precision} <ReliabilityBadge level="a_confirmer" />
          </p>
        </div>
      </section>

      <CanalSeparator />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <ScrollText size={24} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
          <h2>Textes fondateurs</h2>
        </div>
        <ul className="flex flex-col gap-3">
          {data.legal_texts.map((text) => (
            <li
              key={text}
              className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-4"
            >
              <ReliabilityBadge level="verifie" />
              <span className="text-body">{text}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
