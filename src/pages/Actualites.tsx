import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { NewsCard } from '@/components/ui/NewsCard';
import actualitesData from '@/data/actualites.json';
import type { Actualite } from '@/types';

const actualites = actualitesData as Actualite[];

export function Actualites() {
  return (
    <>
      <SeoHead
        title="Actualités"
        description="Toute l'actualité de la Commune du 6ᵉ arrondissement de N'Djaména : élections, projets, sessions budgétaires et vie municipale."
        path="/actualites"
      />
      <PageHeader eyebrow="Vie municipale" title="Actualités" description="Les temps forts de la commune, avec source et date pour chaque information." />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {actualites.map((a) => (
            <NewsCard key={a.id} actualite={a} />
          ))}
        </div>
      </section>
    </>
  );
}
