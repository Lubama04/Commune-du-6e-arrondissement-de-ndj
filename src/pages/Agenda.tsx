import { CalendarX2 } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { formatDateFr } from '@/utils/date';
import eventsData from '@/data/events.json';
import type { EventItem } from '@/types';

const events = eventsData as EventItem[];

export function Agenda() {
  return (
    <>
      <SeoHead
        title="Agenda"
        description="Calendrier des événements officiels de la Commune du 6ᵉ arrondissement de N'Djaména."
        path="/agenda"
      />
      <PageHeader eyebrow="Vie municipale" title="Agenda" description="Sessions du conseil, cérémonies et événements publics." />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-[color:var(--color-border)] py-20 text-center">
            <CalendarX2 size={40} className="text-[color:var(--color-non-trouve)]" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-body max-w-md text-[color:var(--color-text-secondary)]">
              Aucun événement confirmé n'est publié pour le moment. Consultez la page{' '}
              <a href="/actualites" className="font-semibold underline">
                Actualités
              </a>{' '}
              pour suivre la vie municipale.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {events.map((e) => (
              <li key={e.title} className="rounded-lg border border-[color:var(--color-border)] p-5">
                <div className="text-caption text-[color:var(--color-accent-hover)]">{formatDateFr(e.date)}</div>
                <div className="text-h4 mt-1">{e.title}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
