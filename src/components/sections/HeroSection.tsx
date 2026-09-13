import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import commune from '@/data/commune.json';
import stats from '@/data/stats.json';
import type { Commune, Stat } from '@/types';
import { formatNumberFr } from '@/utils/date';

const data = commune as Commune;
const statsData = stats as Stat[];

const QUICK_STATS = ['superficie', 'quartiers', 'carres', 'conseillers'];

/**
 * Hero institutionnel — dégradé bleu nuit → bleu cobalt (direction « Sahel
 * institutionnel »). Aucun motif ni texture répétée : les seuls éléments
 * décoratifs sont une barre or à gauche et deux cercles or très subtils en
 * bas à droite, évoquant le soleil sur le Chari sans effet pixélisé.
 */
export function HeroSection() {
  return (
    <section className="sahel-gradient-hero relative overflow-hidden text-[color:var(--color-text-inverse)]">
      {/* Barre latérale or — seul repère décoratif à gauche */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[15%] bottom-[15%] w-1 rounded-r-sm bg-[color:var(--color-accent)]"
      />

      {/* Cercles or très subtils, en bas à droite — soleil sur le Chari */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full border-2"
        style={{ borderColor: 'rgba(200, 144, 10, 0.12)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full border-2"
        style={{ borderColor: 'rgba(200, 144, 10, 0.08)' }}
      />

      <div className="relative z-10 mx-auto flex max-w-(--max-width-content) flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 md:py-32">
        <span className="text-caption rounded-full border border-white/20 px-4 py-1.5 text-[color:var(--color-accent)]">
          République du Tchad — {data.device}
        </span>
        <h1 className="max-w-3xl">
          Commune du 6ᵉ Arrondissement <br className="hidden sm:block" />
          de <span className="text-[color:var(--color-accent)]">N'Djaména</span>
        </h1>
        <p className="text-body max-w-xl text-white/75">Au service des habitants de Moursal et Paris-Congo</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services"
            className="rounded-md bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-[color:var(--color-text-primary)] transition-colors hover:bg-[color:var(--color-accent-hover)]"
          >
            Nos services
          </Link>
          <Link
            to="/la-commune"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Découvrir la commune <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <dl className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          {QUICK_STATS.map((id) => {
            const stat = statsData.find((s) => s.id === id);
            if (!stat) return null;
            return (
              <div key={id}>
                <dt className="sr-only">{stat.indicator}</dt>
                <dd className="text-h3" style={{ fontFamily: 'var(--font-display)' }}>
                  {formatNumberFr(stat.value)}
                </dd>
                <dd className="text-small text-white/60">{stat.indicator}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Ligne or signature — reprend le motif du Canal des Jardiniers en fondu sur toute la largeur */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-accent) 20%, var(--color-accent) 80%, transparent 100%)',
        }}
      />
    </section>
  );
}
