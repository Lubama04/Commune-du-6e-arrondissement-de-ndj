import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from './navConfig';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] bg-[color:var(--color-surface-dark)] text-[color:var(--color-text-inverse)] transition-transform duration-300 md:hidden ${
        open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="text-h4">Menu</span>
        <button type="button" aria-label="Fermer le menu" onClick={onClose} className="rounded p-2 hover:bg-white/10">
          <X size={24} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Navigation principale mobile" className="flex flex-col gap-1 px-6 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `border-b border-white/10 py-4 text-lg ${isActive ? 'text-[color:var(--color-accent)]' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
