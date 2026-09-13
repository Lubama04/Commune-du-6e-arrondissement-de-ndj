# AUDIT — Dossier local avant reconstruction

Date : 2026-09-13

## Constat principal

Le dossier local `Commune du 6e arrondissement Ndj` contient un projet **entièrement différent** :
le site de la **Commune de Dono-Manga** (Province de la Tandjilé), avec :
- `package.json` → `"name": "commune-de-donomanga"`
- `src/data/commune.ts` → `nom: "Commune de Dono-Manga"`, coordonnées Tandjilé (lat 9.23, lng 16.93)
- remote git `origin` → `https://github.com/Lubama04/Commune-de-Donomanga.git`
- historique git → 2 commits, tous relatifs à Tiné/Dono-Manga, aucun lien avec le 6ᵉ arrondissement de N'Djaména

Ce contenu est **sans rapport** avec la Commune du 6ᵉ Arrondissement de N'Djaména commandée dans ce brief.
Le travail Dono-Manga reste préservé sur son propre dépôt GitHub (`Commune-de-Donomanga`, distinct) — rien n'y est perdu en réutilisant ce dossier local.

Le dépôt cible `https://github.com/Lubama04/Commune-du-6e-arrondissement-de-ndj` existe déjà côté GitHub et est **vide** (vérifié via `gh repo view`).

## Décision

| Élément | Verdict | Action |
|---|---|---|
| `src/data/*.ts` (Dono-Manga) | REMPLACER | Supprimé, remplacé par `src/data/*.json` conforme au schéma du brief (§6) |
| `src/pages/*` (Dono-Manga : Territoire, Eau, Élevage, etc.) | REMPLACER | Supprimé, remplacé par les 18 pages du brief (§5, §7) |
| `src/components/*` | REMPLACER | Supprimé, remplacé par les composants spécifiés (§7) — Header, Footer, ReliabilityBadge, CanalSeparator, AlertBanner, MapEmbed, SeoHead, etc. |
| Stack (`@tanstack/react-router`, `framer-motion`, `recharts`, `swiper`, `react-countup`, Tailwind v3) | REMPLACER | Migration vers `react-router-dom` v7, Tailwind v4, animations CSS pures, pas de librairie de charts (barres CSS), pas de swiper |
| `vite-plugin-pwa` / service worker Dono-Manga | REMPLACER | Reconstruit pour la nouvelle identité (icônes, manifeste) une fois le logo officiel fourni ; conservé en concept (§9.3) |
| `public/icon-*.svg`, `favicon.svg` | REMPLACER | Génériques Dono-Manga (à remplacer par les assets du 6ᵉ arrondissement dès réception du logo officiel par la mairie) |
| `.gitignore` | GARDER | Contenu générique valable tel quel |
| `vercel.json` | REMPLACER | Reconstruit selon §10.1 du brief (headers sécurité, rewrites SPA) |
| remote git `origin` | REMPLACER | `git remote set-url origin https://github.com/Lubama04/Commune-du-6e-arrondissement-de-ndj.git` |
| Historique git | NOUVEAU DÉPART | Le repo cible étant vide et sans lien avec Dono-Manga, un nouvel historique propre est initié pour ce projet |

## Stack technique retenue (conforme brief §2)

- React 19 + Vite 6 + TypeScript strict
- Tailwind CSS v4 (`@tailwindcss/vite`) + tokens CSS custom properties
- Composants shadcn-style écrits à la main (Radix non installé en CLI interactive faute de terminal interactif disponible dans cet environnement ; les primitives nécessaires — Accordion/Dialog — sont implémentées manuellement avec les mêmes conventions d'API et d'accessibilité)
- React Router v7
- Données JSON locales `src/data/*.json`, architecture Supabase-compatible
- react-helmet-async, sitemap.xml, robots.txt, JSON-LD
- Leaflet + OpenStreetMap (intégration Leaflet native plutôt que `react-leaflet` : la librairie causait une erreur « Map container is already initialized » sous React 19 StrictMode en développement — un problème connu de compatibilité react-leaflet/StrictMode. L'implémentation manuelle, avec cycle de vie explicite create/destroy dans `useEffect`, est plus robuste et ne dépend d'aucune librairie tierce supplémentaire pour la carte)
- Animations CSS uniquement
- Lucide React
- @fontsource/spectral + @fontsource/plus-jakarta-sans

## Points de vigilance transférés au rapport final

- Logo officiel manquant
- Email et adresse mairie non confirmés
- Population non datée (RGPH-3 à venir)
- PDC intégral non fourni (à obtenir)
