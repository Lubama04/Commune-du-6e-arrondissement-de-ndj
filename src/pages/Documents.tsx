import { FileX2, Download } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { formatDateFr } from '@/utils/date';
import documentsData from '@/data/documents.json';
import type { DocumentItem } from '@/types';

const documents = documentsData as DocumentItem[];

export function Documents() {
  return (
    <>
      <SeoHead
        title="Documents officiels"
        description="Documents publics de la Commune du 6ᵉ arrondissement de N'Djaména : délibérations, PDC, budget."
        path="/documents"
      />
      <PageHeader eyebrow="Transparence" title="Documents officiels" description="Téléchargez les documents rendus publics par la mairie." />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-[color:var(--color-border)] py-20 text-center">
            <FileX2 size={40} className="text-[color:var(--color-non-trouve)]" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-body max-w-md text-[color:var(--color-text-secondary)]">
              Aucun document officiel (PDC intégral, budget, délibérations) n'a encore été
              transmis par la mairie pour publication. Cette page sera mise à jour dès réception.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between gap-4 rounded-lg border border-[color:var(--color-border)] p-5">
                <div>
                  <div className="text-h4">{doc.title}</div>
                  <div className="text-small text-[color:var(--color-text-muted)]">{formatDateFr(doc.date)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <ReliabilityBadge level={doc.verification} />
                  {doc.file_url && (
                    <a href={doc.file_url} className="rounded-md bg-[color:var(--color-brand-primary)] p-2 text-white">
                      <Download size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
