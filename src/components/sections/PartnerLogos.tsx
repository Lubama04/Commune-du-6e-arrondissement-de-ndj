import { Link } from 'react-router-dom';
import { Handshake } from 'lucide-react';
import partenairesData from '@/data/partenaires.json';
import type { Partenaire } from '@/types';

const partenaires = partenairesData as Partenaire[];

export function PartnerLogos() {
  return (
    <section className="bg-[color:var(--color-surface-muted)] py-16">
      <div className="mx-auto max-w-(--max-width-content) px-4 sm:px-6">
        <h2 className="text-center">Nos partenaires techniques et financiers</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partenaires.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6 text-center"
            >
              <Handshake size={28} className="text-[color:var(--color-brand-secondary)]" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-h4 text-sm">{p.name}</span>
              {p.project && <span className="text-small text-[color:var(--color-text-muted)]">{p.project}</span>}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/partenaires" className="text-small font-semibold text-[color:var(--color-brand-primary)]">
            Voir tous nos partenaires →
          </Link>
        </div>
      </div>
    </section>
  );
}
