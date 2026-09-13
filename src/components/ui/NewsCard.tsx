import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import type { Actualite } from '@/types';
import { formatDateFr } from '@/utils/date';
import { ReliabilityBadge } from './ReliabilityBadge';

export function NewsCard({ actualite }: { actualite: Actualite }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] transition-shadow hover:shadow-lg">
      <div className="flex h-36 items-center justify-center bg-[color:var(--color-surface-muted)]">
        <Newspaper size={36} className="text-[color:var(--color-brand-secondary)]" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 text-small text-[color:var(--color-text-muted)]">
          <span className="text-caption text-[color:var(--color-accent-hover)]">{actualite.category}</span>
          <time dateTime={actualite.date}>{formatDateFr(actualite.date)}</time>
        </div>
        <h3 className="text-h4">
          <Link to={`/actualites/${actualite.slug}`} className="hover:text-[color:var(--color-brand-secondary)]">
            {actualite.title}
          </Link>
        </h3>
        <p className="text-small flex-1 text-[color:var(--color-text-secondary)]">{actualite.excerpt}</p>
        <div className="flex items-center justify-between pt-2">
          <ReliabilityBadge level={actualite.verification} source={actualite.source} date={actualite.date} />
          <Link
            to={`/actualites/${actualite.slug}`}
            className="inline-flex items-center gap-1 text-small font-semibold text-[color:var(--color-brand-primary)] transition-transform group-hover:translate-x-0.5"
          >
            Lire <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
