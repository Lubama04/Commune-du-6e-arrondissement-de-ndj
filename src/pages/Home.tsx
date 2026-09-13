import { Link } from 'react-router-dom';
import { ArrowRight, ScrollText, LandPlot, Users2, Handshake } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { NewsCard } from '@/components/ui/NewsCard';
import { ProjectCard } from '@/components/ui/ProjectCard';
import actualitesData from '@/data/actualites.json';
import projetsData from '@/data/projets.json';
import type { Actualite, Projet } from '@/types';

const actualites = actualitesData as Actualite[];
const projets = projetsData as Projet[];

const QUICK_ACCESS = [
  { icon: ScrollText, label: 'État civil', to: '/services' },
  { icon: LandPlot, label: 'Quartiers', to: '/quartiers' },
  { icon: Users2, label: 'Gouvernance', to: '/gouvernance' },
  { icon: Handshake, label: 'Partenaires', to: '/partenaires' },
];

export function Home() {
  const latestNews = actualites.filter((a) => !a.is_alert).slice(0, 3);
  const featuredProjects = projets.slice(0, 3);

  return (
    <>
      <SeoHead
        title="Accueil"
        description="Site officiel de la Commune du 6ᵉ Arrondissement de N'Djaména : gouvernance, quartiers de Moursal et Paris-Congo, services municipaux, projets et actualités."
        path="/"
      />
      <HeroSection />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {QUICK_ACCESS.map(({ icon: Icon, label, to }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6 text-center transition-shadow hover:shadow-lg"
            >
              <Icon size={28} className="text-[color:var(--color-brand-secondary)]" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-h4">{label}</span>
              <span className="inline-flex items-center gap-1 text-small text-[color:var(--color-brand-primary)] opacity-0 transition-opacity group-hover:opacity-100">
                Accéder <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CanalSeparator />
      <StatsSection />
      <CanalSeparator />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <h2>Actualités récentes</h2>
          <Link to="/actualites" className="text-small font-semibold text-[color:var(--color-brand-primary)]">
            Toutes les actualités →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestNews.map((a) => (
            <NewsCard key={a.id} actualite={a} />
          ))}
        </div>
      </section>

      <CanalSeparator />

      <section className="bg-[color:var(--color-surface-muted)] py-16">
        <div className="mx-auto max-w-(--max-width-content) px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <h2>Projets en cours</h2>
            <Link to="/projets" className="text-small font-semibold text-[color:var(--color-brand-primary)]">
              Tous les projets →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} projet={p} />
            ))}
          </div>
        </div>
      </section>

      <PartnerLogos />
    </>
  );
}
