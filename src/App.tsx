import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const LaCommune = lazy(() => import('./pages/LaCommune').then((m) => ({ default: m.LaCommune })));
const Gouvernance = lazy(() => import('./pages/Gouvernance').then((m) => ({ default: m.Gouvernance })));
const Quartiers = lazy(() => import('./pages/Quartiers').then((m) => ({ default: m.Quartiers })));
const QuartierDetail = lazy(() => import('./pages/QuartierDetail').then((m) => ({ default: m.QuartierDetail })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail })));
const Projets = lazy(() => import('./pages/Projets').then((m) => ({ default: m.Projets })));
const ProjetDetail = lazy(() => import('./pages/ProjetDetail').then((m) => ({ default: m.ProjetDetail })));
const PDC = lazy(() => import('./pages/PDC').then((m) => ({ default: m.PDC })));
const Actualites = lazy(() => import('./pages/Actualites').then((m) => ({ default: m.Actualites })));
const ActualiteDetail = lazy(() => import('./pages/ActualiteDetail').then((m) => ({ default: m.ActualiteDetail })));
const Partenaires = lazy(() => import('./pages/Partenaires').then((m) => ({ default: m.Partenaires })));
const Environnement = lazy(() => import('./pages/Environnement').then((m) => ({ default: m.Environnement })));
const Galerie = lazy(() => import('./pages/Galerie').then((m) => ({ default: m.Galerie })));
const Agenda = lazy(() => import('./pages/Agenda').then((m) => ({ default: m.Agenda })));
const Documents = lazy(() => import('./pages/Documents').then((m) => ({ default: m.Documents })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

/** Remonte en haut de page à chaque changement de route. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Chargement">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[color:var(--color-border)] border-t-[color:var(--color-brand-primary)]" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/la-commune" element={<LaCommune />} />
            <Route path="/gouvernance" element={<Gouvernance />} />
            <Route path="/quartiers" element={<Quartiers />} />
            <Route path="/quartiers/:slug" element={<QuartierDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projets" element={<Projets />} />
            <Route path="/projets/:slug" element={<ProjetDetail />} />
            <Route path="/pdc" element={<PDC />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:slug" element={<ActualiteDetail />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/environnement" element={<Environnement />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
