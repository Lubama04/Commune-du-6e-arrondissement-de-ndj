# RAPPORT FINAL — SITE COMMUNE DU 6ᵉ ARRONDISSEMENT DE N'DJAMÉNA

## ✅ Statut : DÉPLOYÉ

## 🌐 URL du site

**https://commune-6e-arrondissement-ndjamena.vercel.app**

> Note : le brief anticipait l'URL `commune6-ndjamena.vercel.app`, mais ce nom de
> projet Vercel n'était pas garanti disponible. Le nom réellement utilisé est
> `commune-6e-arrondissement-ndjamena` (dérivé du nom du dépôt GitHub) ; toutes
> les références SEO (canonical, Open Graph, JSON-LD, sitemap.xml, robots.txt)
> ont été alignées sur cette URL réelle avant le déploiement final.

## 📊 Pages construites (18 + 404)

La Commune, Gouvernance, Quartiers (+ détail par quartier), Services (+ détail
par service), Projets (+ détail par projet), PDC, Actualités (+ détail par
actualité), Partenaires, Environnement, Galerie, Agenda, Documents, Contact,
Accueil, 404.

## 🔍 Audit du dossier initial

Le dossier local contenait un projet **entièrement différent et sans rapport** :
le site de la **Commune de Dono-Manga** (Province de la Tandjilé), avec son
propre remote GitHub (`Commune-de-Donomanga`, distinct et préservé). Ce contenu
a été intégralement remplacé — voir [AUDIT.md](AUDIT.md) pour le détail
fichier par fichier (garder / modifier / remplacer). Un nouvel historique Git a
été démarré pour ce projet, sans lien avec l'historique Dono-Manga.

## 🎨 Design

- Direction : « Autorité territoriale africaine contemporaine »
- Palette : Vert forêt `#1B4332` + Or `#D4A017`
- Typographie : Spectral (titres, via @fontsource) + Plus Jakarta Sans (corps)
- Élément signature : `CanalSeparator` — ligne or de 80px entre chaque section
  majeure, sur toutes les pages, évoquant le Canal des Jardiniers
- Motif géométrique losange (Sahel) en fond des sections sombres
- Aucune stock photo : icônes Lucide + SVG maison (favicon, og-image) en
  attendant le logo officiel de la mairie

## 📦 Données JSON (`src/data/`, 12 fichiers)

| Fichier | Entrées | Origine |
|---|---|---|
| commune.json | 1 | Contenu fourni dans le brief |
| gouvernance.json | 1 (18 conseillers) | Contenu fourni — Cour Suprême du Tchad |
| quartiers.json | 2 | Contenu fourni (Moursal, Paris-Congo) |
| projets.json | 4 | Contenu fourni (PACAJ, PDC, reprofilage, assainissement) |
| actualites.json | 8 (dont alerte choléra) | Contenu fourni |
| services.json | 5 | Contenu fourni |
| partenaires.json | 4 | Contenu fourni |
| stats.json | 7 | Contenu fourni |
| equipements.json | 5 | Dérivé des `equipements_notables` sourcés de Moursal |
| documents.json | 0 | Vide — aucun document officiel transmis (état honnête) |
| galerie.json | 0 | Vide — aucune photo officielle transmise |
| events.json | 0 | Vide — aucun agenda confirmé publiquement |

Chaque entrée sensible porte un champ `verification` (`verifie` / `a_confirmer`
/ `non_trouve`) affiché via le composant `ReliabilityBadge`, avec info-bulle
source + date. Aucune donnée n'a été inventée : les champs manquants portent
la mention « À confirmer auprès de la mairie ».

## ⚡ Performance

- Lazy loading de toutes les routes (`React.lazy` + `Suspense`)
- Code-splitting manuel (vendor / maps / seo séparés)
- Build de production : ✅ réussi, aucun avertissement TypeScript strict
- Testé en conditions réelles (build `vite preview`) : aucune erreur console

## ♿ Accessibilité

- `SkipLink` (« Aller au contenu principal »)
- `role="main"` sur le contenu, focus visible `outline: 2px solid var(--color-accent)`
- `aria-current="page"` automatique sur les liens actifs (React Router NavLink)
- `prefers-reduced-motion` respecté (transitions désactivées)
- Alertes (`role="alert" aria-live="polite"`) pour le bandeau choléra

## 🔒 GitHub

https://github.com/Lubama04/Commune-du-6e-arrondissement-de-ndj (branche `main`)

## 🐛 Anomalies rencontrées et corrigées en cours de build

1. **Débordement horizontal** sur les en-têtes de section avec icône + titre +
   badge (Gouvernance, La Commune, Environnement) → `flex-wrap` ajouté +
   garde-fou global `overflow-x: hidden` sur `html, body`.
2. **`react-helmet-async` incompatible peer-dep React 19** → installé avec
   `--legacy-peer-deps` (fonctionnellement compatible), `.npmrc` créé pour que
   Vercel applique le même comportement au build.
3. **`react-leaflet` provoquait une erreur « Map container is already
   initialized » sous React 19 StrictMode** (bug connu de compatibilité, visible
   uniquement en développement) → remplacé par une intégration Leaflet native
   avec cycle de vie explicite (create/destroy dans `useEffect`), plus robuste
   et sans dépendance supplémentaire. Vérifié sans erreur en build de
   production.

## ⚠️ Points de vigilance

- **Logo officiel manquant** : prévoir livraison par la mairie (favicon/OG
  actuels sont des SVG maison)
- **Email officiel non confirmé** : à collecter
- **Adresse postale et horaires de la mairie** : à confirmer
- **Numéro de téléphone de la mairie** : affiché avec badge « À confirmer »
- **Données de population (66 000 hab.) non datées** : attendre les résultats
  officiels du RGPH-3 (2026)
- **PDC intégral** : document non fourni — la page `/pdc` explique le contexte
  et affiche un encadré d'attente ; `/documents` est honnêtement vide
- **Aucune photo officielle** : `/galerie` affiche un état vide explicite

## 🔄 Prochaines étapes (v2)

1. Intégrer Supabase (schéma identique aux fichiers JSON, voir `src/types/index.ts`)
2. Ajouter un back-office éditorial pour les actualités/projets/documents
3. Intégrer le PDC intégral en PDF dès réception
4. Ajouter les photos et le logo officiels
5. Formulaire de réclamation citoyen avec transmission réelle (email/API)
6. Notifications SMS/WhatsApp pour les alertes sanitaires
