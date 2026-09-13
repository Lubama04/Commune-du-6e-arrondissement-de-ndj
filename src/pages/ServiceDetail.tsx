import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Coins, Phone } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { formatFcfa } from '@/utils/date';
import servicesData from '@/data/services.json';
import type { Service } from '@/types';

const services = servicesData as Service[];

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <SeoHead title={service.title} description={service.description} path={`/services/${service.slug}`} />
      <PageHeader eyebrow={service.category} title={service.title} description={service.description} />

      <section className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-small font-semibold text-[color:var(--color-brand-primary)]">
          <ArrowLeft size={16} aria-hidden="true" /> Tous les services
        </Link>

        <div className="flex flex-col gap-6">
          {service.procedure && (
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6">
              <div className="mb-2 flex items-center gap-2">
                <FileText size={18} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
                <h2 className="text-h4">Procédure</h2>
              </div>
              <p className="text-body text-[color:var(--color-text-secondary)]">{service.procedure}</p>
            </div>
          )}

          {service.required_documents.length > 0 && (
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6">
              <h2 className="text-h4 mb-2">Pièces requises</h2>
              <ul className="list-inside list-disc text-body text-[color:var(--color-text-secondary)]">
                {service.required_documents.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {service.delay && (
              <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
                <Clock size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
                <div>
                  <div className="text-caption text-[color:var(--color-text-muted)]">Délai</div>
                  <div className="text-body">{service.delay}</div>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
              <Coins size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
              <div>
                <div className="text-caption text-[color:var(--color-text-muted)]">Coût</div>
                <div className="text-body">{formatFcfa(service.cost_fcfa)}</div>
                {service.cost_note && <div className="text-small text-[color:var(--color-text-muted)]">{service.cost_note}</div>}
              </div>
            </div>
          </div>

          {service.contact && (
            <div className="flex items-start gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-5">
              <Phone size={18} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
              <div className="text-body">{service.contact}</div>
            </div>
          )}

          <ReliabilityBadge level={service.verification} />
        </div>
      </section>
    </>
  );
}
