export const SITE_URL = 'https://commune6-ndjamena.vercel.app';
export const SITE_NAME = "Commune du 6ᵉ Arrondissement de N'Djaména";

/** Construit une URL canonique absolue à partir d'un chemin de route. */
export function canonicalUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean === '/' ? '' : clean}`;
}
