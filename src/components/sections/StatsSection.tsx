import { Building2, Users, MapPinned, Grid3x3, Landmark, Vote } from 'lucide-react';
import statsData from '@/data/stats.json';
import type { Stat } from '@/types';
import { StatCard } from '@/components/ui/StatCard';

const stats = statsData as Stat[];

const ICONS: Record<string, typeof Building2> = {
  superficie: MapPinned,
  population: Users,
  menages: Building2,
  quartiers: Grid3x3,
  carres: Grid3x3,
  conseillers: Landmark,
  'inscrits-2024': Vote,
};

export function StatsSection() {
  return (
    <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
      <h2 className="text-center">La commune en chiffres</h2>
      <p className="text-body mx-auto mt-3 max-w-(--max-width-text) text-center text-[color:var(--color-text-secondary)]">
        Chaque donnée est accompagnée de son niveau de fiabilité et de sa source.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={ICONS[stat.id] ?? Building2}
            value={stat.value}
            unit={stat.unit}
            label={stat.indicator}
            reliability={stat.reliability}
            source={stat.source}
          />
        ))}
      </div>
    </section>
  );
}
