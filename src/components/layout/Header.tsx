import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Landmark } from 'lucide-react';
import { NAV_ITEMS } from './navConfig';
import { MobileMenu } from './MobileMenu';
import { AlertBanner } from '@/components/ui/AlertBanner';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <AlertBanner />
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[color:var(--color-brand-primary)]/95 backdrop-blur shadow-md'
            : 'bg-[color:var(--color-brand-primary)]'
        }`}
      >
        <div className="mx-auto flex max-w-(--max-width-content) items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 text-[color:var(--color-text-inverse)]" aria-label="Accueil — Commune du 6ᵉ Arrondissement de N'Djaména">
            <Landmark size={28} className="text-[color:var(--color-accent)]" strokeWidth={1.75} aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                6ᵉ Arrondissement
              </span>
              <span className="block text-xs opacity-80">N'Djaména</span>
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-block rounded-md px-3 py-2 text-sm font-medium text-[color:var(--color-text-inverse)] transition-colors hover:bg-white/10 ${
                        isActive ? 'border-b-2 border-[color:var(--color-accent)]' : ''
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden rounded-md bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--color-surface-dark)] transition-colors hover:bg-[color:var(--color-accent-hover)] sm:inline-block"
            >
              Nous contacter
            </Link>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen(true)}
              className="rounded-md p-2 text-[color:var(--color-text-inverse)] hover:bg-white/10 md:hidden"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
