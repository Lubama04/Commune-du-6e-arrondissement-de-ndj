import { Droplets, Recycle, ShieldAlert } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import projetsData from '@/data/projets.json';
import actualitesData from '@/data/actualites.json';
import type { Projet, Actualite } from '@/types';

const projets = projetsData as Projet[];
const actualites = actualitesData as Actualite[];

const envProjets = projets.filter((p) => p.category.includes('environnement') || p.category === 'salubrité');
const alerte = actualites.find((a) => a.is_alert);

export function Environnement() {
  return (
    <>
      <SeoHead
        title="Environnement & Assainissement"
        description="Cadre de vie, assainissement et gestion des eaux pluviales dans la Commune du 6ᵉ arrondissement de N'Djaména : Canal des Jardiniers, riposte choléra."
        path="/environnement"
      />
      <PageHeader
        eyebrow="Cadre de vie"
        title="Environnement & Assainissement"
        description="Les actions communales pour un cadre de vie plus sain, entre gestion des eaux pluviales et riposte sanitaire."
      />

      {alerte && (
        <section className="mx-auto max-w-(--max-width-content) px-4 pt-12 sm:px-6">
          <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-error)] bg-[color:var(--color-surface-muted)] p-5">
            <ShieldAlert size={22} className="mt-0.5 shrink-0 text-[color:var(--color-error)]" aria-hidden="true" />
            <div>
              <h2 className="text-h4">{alerte.title}</h2>
              <p className="text-small mt-1 text-[color:var(--color-text-secondary)]">{alerte.content ?? alerte.excerpt}</p>
              <div className="mt-3">
                <ReliabilityBadge level={alerte.verification} source={alerte.source} date={alerte.date} />
              </div>
            </div>
          </div>
        </section>
      )}

      <CanalSeparator />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Droplets size={24} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
          <h2>Assainissement et gestion des eaux</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {envProjets.map((p) => (
            <ProjectCard key={p.id} projet={p} />
          ))}
        </div>
      </section>

      <CanalSeparator />

      <section className="bg-[color:var(--color-surface-muted)] py-16">
        <div className="mx-auto max-w-(--max-width-text) px-4 text-center sm:px-6">
          <Recycle size={32} className="mx-auto text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
          <h2 className="mt-4">Vos gestes comptent</h2>
          <p className="text-body mt-3 text-[color:var(--color-text-secondary)]">
            Buvez de l'eau traitée, lavez-vous les mains régulièrement, évitez les dépôts sauvages
            d'ordures et signalez toute insalubrité à la mairie via nos services municipaux.
          </p>
        </div>
      </section>
    </>
  );
}
