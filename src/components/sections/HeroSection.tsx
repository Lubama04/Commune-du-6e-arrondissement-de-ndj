import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import commune from '@/data/commune.json';
import stats from '@/data/stats.json';
import type { Commune, Stat } from '@/types';
import { formatNumberFr } from '@/utils/date';
import { CanalSeparator } from '@/components/ui/CanalSeparator';

const data = commune as Commune;
const statsData = stats as Stat[];

const QUICK_STATS = ['superficie', 'quartiers', 'carres', 'conseillers'];

export function HeroSection() {
  return (
    <section className="pattern-losange relative overflow-hidden bg-[color:var(--color-surface-dark)] text-[color:var(--color-text-inverse)]">
      <div className="mx-auto flex max-w-(--max-width-content) flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 md:py-32">
        <span className="text-caption rounded-full border border-white/20 px-4 py-1.5 text-[color:var(--color-accent)]">
          République du Tchad — {data.device}
        </span>
        <h1 className="max-w-3xl">{data.name}</h1>
        <p className="text-body max-w-xl text-white/75">Au service des habitants de Moursal et Paris-Congo</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/la-commune"
            className="rounded-md bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-[color:var(--color-surface-dark)] transition-colors hover:bg-[color:var(--color-accent-hover)]"
          >
            Découvrir la commune
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Nos services <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <CanalSeparator />

        <dl className="grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
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
    </section>
  );
}
