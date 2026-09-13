import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Landmark } from 'lucide-react';
import { NAV_ITEMS } from './navConfig';
import { MobileMenu } from './MobileMenu';
import { AlertBanner } from '@/components/ui/AlertBanner';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const fixedRef = useRef<HTMLDivElement | null>(null);

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

  // Le bandeau (alerte + navigation) est fixe en haut de l'écran. Sa hauteur
  // varie (alerte affichée ou fermée) : un ResizeObserver mesure la hauteur
  // réelle et l'applique au spacer ci-dessous, pour que le contenu ne passe
  // jamais sous la barre fixe, sans dépendre d'une valeur pixel figée.
  useEffect(() => {
    const el = fixedRef.current;
    if (!el) return;
    const update = () => setSpacerHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={fixedRef} className="fixed inset-x-0 top-0 z-50" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <AlertBanner />
        <header
          className={`bg-[color:var(--color-surface)] transition-shadow duration-300 ${
            scrolled ? 'border-b border-[color:var(--color-border)] shadow-[0_2px_12px_rgba(26,58,107,0.12)]' : ''
          }`}
        >
          <div className="mx-auto flex max-w-(--max-width-content) items-center justify-between px-4 py-3 sm:px-6">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Accueil — Commune du 6ᵉ Arrondissement de N'Djaména">
              <Landmark size={28} className="text-[color:var(--color-accent)]" strokeWidth={1.75} aria-hidden="true" />
              <span className="leading-tight">
                <span
                  className="block text-sm font-semibold text-[color:var(--color-brand-primary)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  6ᵉ Arrondissement
                </span>
                <span className="block text-xs text-[color:var(--color-accent)]">N'Djaména</span>
              </span>
            </Link>

            <nav aria-label="Navigation principale" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `inline-block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[color:var(--color-brand-primary)]/5 hover:text-[color:var(--color-accent)] ${
                          isActive
                            ? 'border-b-2 border-[color:var(--color-accent)] text-[color:var(--color-accent)]'
                            : 'text-[color:var(--color-brand-primary)]'
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
                className="hidden rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[color:var(--color-brand-light)] sm:inline-block"
                style={{ color: '#FFFFFF' }}
              >
                Nous contacter
              </Link>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                onClick={() => setMenuOpen(true)}
                className="rounded-md p-2 text-[color:var(--color-brand-primary)] hover:bg-[color:var(--color-brand-primary)]/5 md:hidden"
              >
                <Menu size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer — compense la hauteur du bandeau fixe pour que le contenu
          ne soit jamais masqué en dessous. */}
      <div style={{ height: spacerHeight || 'var(--header-height)' }} aria-hidden="true" />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
