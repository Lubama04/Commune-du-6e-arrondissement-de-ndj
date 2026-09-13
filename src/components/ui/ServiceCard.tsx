import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import type { Service } from '@/types';
import { ReliabilityBadge } from './ReliabilityBadge';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6 transition-shadow hover:shadow-lg">
      <FileText size={24} className="text-[color:var(--color-brand-secondary)]" strokeWidth={1.75} aria-hidden="true" />
      <span className="text-caption text-[color:var(--color-accent-hover)]">{service.category}</span>
      <h3 className="text-h4">
        <Link to={`/services/${service.slug}`} className="hover:text-[color:var(--color-brand-secondary)]">
          {service.title}
        </Link>
      </h3>
      <p className="text-small flex-1 text-[color:var(--color-text-secondary)]">{service.description}</p>
      <div className="flex items-center justify-between pt-2">
        <ReliabilityBadge level={service.verification} />
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 text-small font-semibold text-[color:var(--color-brand-primary)]"
        >
          Voir la démarche <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
