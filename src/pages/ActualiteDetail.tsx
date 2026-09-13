import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { formatDateFr } from '@/utils/date';
import actualitesData from '@/data/actualites.json';
import type { Actualite } from '@/types';

const actualites = actualitesData as Actualite[];

export function ActualiteDetail() {
  const { slug } = useParams<{ slug: string }>();
  const actualite = actualites.find((a) => a.slug === slug);

  if (!actualite) return <Navigate to="/actualites" replace />;

  return (
    <>
      <SeoHead title={actualite.title} description={actualite.excerpt} path={`/actualites/${actualite.slug}`} />
      <article className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <Link to="/actualites" className="mb-8 inline-flex items-center gap-2 text-small font-semibold text-[color:var(--color-brand-primary)]">
          <ArrowLeft size={16} aria-hidden="true" /> Toutes les actualités
        </Link>

        <span className="text-caption text-[color:var(--color-accent-hover)]">{actualite.category}</span>
        <h1 className="mt-2">{actualite.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-small text-[color:var(--color-text-muted)]">
          <time dateTime={actualite.date}>{formatDateFr(actualite.date)}</time>
          <ReliabilityBadge level={actualite.verification} source={actualite.source} date={actualite.date} />
        </div>

        <div className="text-body mt-8 text-[color:var(--color-text-secondary)]">
          {(actualite.content ?? actualite.excerpt).split('\n').map((para, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
