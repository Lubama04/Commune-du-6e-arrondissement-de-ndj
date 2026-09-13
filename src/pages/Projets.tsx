import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ProjectCard } from '@/components/ui/ProjectCard';
import projetsData from '@/data/projets.json';
import type { Projet } from '@/types';

const projets = projetsData as Projet[];

export function Projets() {
  return (
    <>
      <SeoHead
        title="Projets & PDC"
        description="Les projets de développement en cours et réalisés dans la Commune du 6ᵉ arrondissement de N'Djaména, dont l'aménagement du Canal des Jardiniers (PACAJ)."
        path="/projets"
      />
      <PageHeader
        eyebrow="Développement"
        title="Projets & Plan de Développement Communal"
        description="Infrastructures, environnement, gouvernance : les chantiers qui transforment le 6ᵉ arrondissement."
      />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2>Tous les projets</h2>
          <Link to="/pdc" className="text-small font-semibold text-[color:var(--color-brand-primary)]">
            Voir le PDC →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projets.map((p) => (
            <ProjectCard key={p.id} projet={p} />
          ))}
        </div>
      </section>

      <CanalSeparator />
    </>
  );
}
