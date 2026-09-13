import { Landmark, Route, HeartPulse, GraduationCap, Store, Leaf, FileWarning } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import projetsData from '@/data/projets.json';
import type { Projet } from '@/types';
import { formatDateFr } from '@/utils/date';

const projets = projetsData as Projet[];
const pdc = projets.find((p) => p.id === 'pdc-2025');

const AXES = [
  { icon: Landmark, label: 'Gouvernance locale' },
  { icon: Route, label: 'Infrastructures et mobilité' },
  { icon: HeartPulse, label: 'Santé et assainissement' },
  { icon: GraduationCap, label: 'Éducation et jeunesse' },
  { icon: Store, label: 'Économie locale et emploi' },
  { icon: Leaf, label: 'Environnement et résilience' },
];

export function PDC() {
  return (
    <>
      <SeoHead
        title="Plan de Développement Communal"
        description="Le Plan de Développement Communal (PDC) du 6ᵉ arrondissement de N'Djaména, validé le 10 décembre 2025 avec l'appui de l'Union européenne."
        path="/pdc"
      />
      <PageHeader
        eyebrow="Stratégie"
        title="Plan de Développement Communal"
        description={pdc ? `Validé le ${formatDateFr(pdc.end_date)} avec l'appui de l'Union européenne` : undefined}
      />

      <section className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <h2>Qu'est-ce que le PDC ?</h2>
        <p className="text-body mt-4 text-[color:var(--color-text-secondary)]">
          Le Plan de Développement Communal (PDC) est le document de référence qui guide l'action
          municipale sur plusieurs années. Il définit les priorités de développement de la commune :
          gouvernance locale, infrastructures, santé, éducation, économie locale, environnement,
          jeunesse et cohésion sociale.
        </p>

        <CanalSeparator align="left" tight />

        <h2>Processus d'élaboration</h2>
        <ol className="mt-4 flex flex-col gap-3">
          {['Diagnostic participatif', 'Ateliers thématiques', 'Validation communautaire', 'Adoption par le conseil municipal'].map(
            (step, i) => (
              <li key={step} className="flex items-center gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-brand-primary)] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-body">{step}</span>
              </li>
            ),
          )}
        </ol>

        <div className="mt-8 flex items-start gap-3 rounded-lg border border-[color:var(--color-accent)] bg-[color:var(--color-surface-muted)] p-5">
          <FileWarning size={20} className="mt-0.5 shrink-0 text-[color:var(--color-accent-hover)]" aria-hidden="true" />
          <p className="text-body text-[color:var(--color-text-secondary)]">
            Le document intégral du PDC sera disponible en téléchargement dès sa mise à disposition
            par la mairie. En attendant, <a href="/contact" className="font-semibold underline">contactez-nous</a>.
          </p>
        </div>
      </section>

      <CanalSeparator />

      <section className="bg-[color:var(--color-surface-muted)] py-16">
        <div className="mx-auto max-w-(--max-width-content) px-4 sm:px-6">
          <h2 className="text-center">Axes prioritaires connus</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AXES.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-4 rounded-lg bg-[color:var(--color-surface-elevated)] p-5">
                <Icon size={24} className="shrink-0 text-[color:var(--color-brand-secondary)]" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-body font-medium">{i + 1}. {label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CanalSeparator />

      <section className="mx-auto max-w-(--max-width-text) px-4 py-16 sm:px-6">
        <h2>Partenaires du PDC</h2>
        <div className="mt-4 flex items-center gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-6">
          <div>
            <div className="text-h4">Union européenne</div>
            <p className="text-small mt-1 text-[color:var(--color-text-secondary)]">
              Appui financier et technique via le Programme d'appui à la gouvernance du Tchad.
            </p>
          </div>
        </div>
        {pdc && (
          <div className="mt-6">
            <ReliabilityBadge level={pdc.verification} source={pdc.funder} date={pdc.end_date ?? undefined} />
          </div>
        )}
      </section>
    </>
  );
}
