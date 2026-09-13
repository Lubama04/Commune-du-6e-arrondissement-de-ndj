import { ImageOff } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import galerieData from '@/data/galerie.json';
import type { GalerieItem } from '@/types';

const galerie = galerieData as GalerieItem[];

export function Galerie() {
  return (
    <>
      <SeoHead
        title="Galerie"
        description="Photothèque officielle de la Commune du 6ᵉ arrondissement de N'Djaména."
        path="/galerie"
      />
      <PageHeader eyebrow="Médiathèque" title="Galerie" description="Photos officielles des événements et réalisations de la commune." />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        {galerie.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-[color:var(--color-border)] py-20 text-center">
            <ImageOff size={40} className="text-[color:var(--color-non-trouve)]" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-body max-w-md text-[color:var(--color-text-secondary)]">
              Aucune photo officielle n'a encore été mise à disposition par la mairie. Cette
              galerie sera alimentée dès réception des visuels officiels.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galerie.map((item) => (
              <div key={item.id} className="rounded-lg border border-[color:var(--color-border)] p-4">
                {item.title}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
