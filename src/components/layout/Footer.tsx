import { Link } from 'react-router-dom';
import { Landmark, Phone, MapPin, Mail } from 'lucide-react';
import commune from '@/data/commune.json';
import type { Commune } from '@/types';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { NAV_ITEMS } from './navConfig';

const data = commune as Commune;

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-surface-dark)] text-[color:var(--color-text-inverse)]">
      <div className="mx-auto grid max-w-(--max-width-content) gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2.5">
            <Landmark size={26} className="text-[color:var(--color-accent)]" aria-hidden="true" />
            <span className="text-h4">{data.name}</span>
          </div>
          <p className="text-small max-w-md text-white/70">{data.description}</p>
          <p className="text-small mt-4 text-white/50">{data.device}</p>
        </div>

        <div>
          <h3 className="text-caption mb-4 text-[color:var(--color-accent)]">Navigation</h3>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-small text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/documents" className="text-small text-white/80 hover:text-white">
                Documents
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-caption mb-4 text-[color:var(--color-accent)]">Contact</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-small text-white/80">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {data.mairie_address} <ReliabilityBadge level="a_confirmer" />
              </span>
            </li>
            <li className="flex items-start gap-2 text-small text-white/80">
              <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {data.mairie_phone} <ReliabilityBadge level={data.mairie_phone_verification} />
              </span>
            </li>
            <li className="flex items-start gap-2 text-small text-white/80">
              <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                Email non communiqué <ReliabilityBadge level={data.mairie_email_verification} />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-(--max-width-content) flex-col gap-2 px-4 py-6 text-small text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {data.name}. Tous droits réservés.</p>
          <p>Développé par ETS Flaugust Business</p>
        </div>
      </div>
    </footer>
  );
}
