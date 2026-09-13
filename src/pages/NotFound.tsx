import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';

export function NotFound() {
  return (
    <>
      <SeoHead title="Page introuvable" description="La page demandée n'existe pas." path="/404" />
      <section className="mx-auto flex min-h-[60vh] max-w-(--max-width-text) flex-col items-center justify-center gap-6 px-4 text-center sm:px-6">
        <Compass size={48} className="text-[color:var(--color-brand-secondary)]" strokeWidth={1.5} aria-hidden="true" />
        <h1>404 — Page introuvable</h1>
        <p className="text-body text-[color:var(--color-text-secondary)]">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="rounded-md bg-[color:var(--color-brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-brand-secondary)]"
        >
          Retour à l'accueil
        </Link>
      </section>
    </>
  );
}
