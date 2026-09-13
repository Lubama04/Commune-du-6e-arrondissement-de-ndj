import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Bandeau d'en-tête standard pour les pages secondaires : dégradé bleu nuit
 * → bleu cobalt, sobre, sans motif ni texture (direction « Sahel institutionnel »).
 */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <section className="sahel-gradient text-[color:var(--color-text-inverse)]">
      <div className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6 md:py-20">
        {eyebrow && <span className="text-caption text-[color:var(--color-accent)]">{eyebrow}</span>}
        <h1 className="mt-3 max-w-3xl text-white">{title}</h1>
        {description && <p className="text-body mt-4 max-w-2xl text-white/82">{description}</p>}
        {children}
      </div>
    </section>
  );
}
