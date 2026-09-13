# Commune du 6ᵉ Arrondissement de N'Djaména — Site Officiel

> Plateforme municipale officielle | React 19 + Vite + TypeScript + Tailwind CSS v4

## 🌐 Site en ligne

[commune-6e-arrondissement-ndjamena.vercel.app](https://commune-6e-arrondissement-ndjamena.vercel.app)

## 📋 Stack

- React 19 + Vite 6 + TypeScript strict
- Tailwind CSS v4 + composants shadcn-style écrits à la main
- React Router v7
- Leaflet / React-Leaflet + OpenStreetMap
- react-helmet-async (SEO, Open Graph, JSON-LD)
- Données JSON locales (architecture Supabase-compatible)

## 🏗️ Architecture

Les données sont stockées dans `src/data/*.json`.
Chaque entrée porte un champ `verification` (`verifie` / `a_confirmer` / `non_trouve`)
et une source, conformément aux standards de transparence institutionnelle du site
(voir le composant [`ReliabilityBadge`](src/components/ui/ReliabilityBadge.tsx)).

## 🎨 Design system

- Direction : « Autorité territoriale africaine contemporaine »
- Palette : vert forêt `#1B4332` + or sable `#D4A017`
- Typographie : Spectral (titres) + Plus Jakarta Sans (corps)
- Élément signature : le [`CanalSeparator`](src/components/ui/CanalSeparator.tsx), une ligne
  dorée évoquant le Canal des Jardiniers qui borde la commune à l'ouest
- Tokens : [`src/styles/tokens.css`](src/styles/tokens.css)

## 🔄 Migration Supabase

Quand Supabase est disponible : remplacer les imports JSON par des appels Supabase Client
dans `src/hooks/useData.ts`. Le schéma des tables est identique aux fichiers JSON
(voir `src/types/index.ts`).

## 📁 Ajout de contenu

Modifier les fichiers dans `src/data/` puis relancer `npm run build`.
Back-office éditorial prévu pour la v2.

## 🚀 Développement local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # build de production -> dist/
npm run preview    # prévisualiser le build
```

## 🛡️ Crédits

Développé par ETS Flaugust Business (LUBAMA Jean Chrysostome ZACEI)
pour la Commune du 6ᵉ Arrondissement de N'Djaména, République du Tchad.
