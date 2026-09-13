import type { LucideIcon } from 'lucide-react';
import type { ReliabilityLevel } from '@/types';
import { formatNumberFr } from '@/utils/date';
import { ReliabilityBadge } from './ReliabilityBadge';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  unit?: string;
  label: string;
  reliability?: ReliabilityLevel;
  source?: string;
  dark?: boolean;
}

export function StatCard({ icon: Icon, value, unit, label, reliability, source, dark = false }: StatCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-lg p-6 text-center ${
        dark
          ? 'bg-white/5 text-[color:var(--color-text-inverse)]'
          : 'border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)]'
      }`}
    >
      <Icon size={28} className="text-[color:var(--color-accent)]" strokeWidth={1.75} aria-hidden="true" />
      <div className="text-h3" style={{ fontFamily: 'var(--font-display)' }}>
        {formatNumberFr(value)}
        {unit && <span className="ml-1 text-base font-normal opacity-70">{unit}</span>}
      </div>
      <div className={`text-small ${dark ? 'opacity-80' : 'text-[color:var(--color-text-secondary)]'}`}>{label}</div>
      {reliability && <ReliabilityBadge level={reliability} source={source} />}
    </div>
  );
}
