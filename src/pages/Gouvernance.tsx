import { UserRound, Vote, Info } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import gouvernance from '@/data/gouvernance.json';
import type { Gouvernance as GouvernanceType } from '@/types';
import { formatDateFr, formatNumberFr } from '@/utils/date';

const data = gouvernance as GouvernanceType;

function EluCard({
  name,
  role,
  meta,
  verification,
  source,
}: {
  name: string;
  role: string;
  meta?: string;
  verification: 'verifie' | 'a_confirmer' | 'non_trouve';
  source: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-8 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--color-surface-muted)]">
        <UserRound size={48} className="text-[color:var(--color-brand-secondary)]" strokeWidth={1.25} aria-hidden="true" />
      </div>
      <div>
        <div className="text-caption text-[color:var(--color-accent-hover)]">{role}</div>
        <div className="text-h3 mt-1">{name}</div>
        {meta && <div className="text-small mt-1 text-[color:var(--color-text-muted)]">{meta}</div>}
      </div>
      <ReliabilityBadge level={verification} source={source} />
    </div>
  );
}

export function Gouvernance() {
  const { maire, adjoint, administratrice_deleguee, elections_2024, conseillers, tutelle } = data;
  const maxVoix = Math.max(...elections_2024.resultats.map((r) => r.voix));

  return (
    <>
      <SeoHead
        title="Gouvernance"
        description="Découvrez les 18 conseillers municipaux élus le 29 décembre 2024, la maire Zénaba Édith Riyaira et l'organisation du conseil de la Commune du 6ᵉ arrondissement de N'Djaména."
        path="/gouvernance"
      />
      <PageHeader
        eyebrow="Institutions"
        title="Gouvernance"
        description={`Conseil municipal élu le ${formatDateFr(elections_2024.date)}`}
      />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <EluCard name={maire.full_name} role={maire.role} verification={maire.verification} source={maire.source} />
          <EluCard name={adjoint.full_name} role={adjoint.role} verification={adjoint.verification} source={adjoint.source} />
          <EluCard
            name={administratrice_deleguee.full_name}
            role={administratrice_deleguee.role}
            meta={administratrice_deleguee.decree}
            verification={administratrice_deleguee.verification}
            source={administratrice_deleguee.decree ?? ''}
          />
        </div>
      </section>

      <CanalSeparator />

      <section className="bg-[color:var(--color-surface-muted)] py-16">
        <div className="mx-auto max-w-(--max-width-content) px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Vote size={24} className="text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <h2>Résultats des élections communales 2024</h2>
            <ReliabilityBadge level={elections_2024.verification} source={elections_2024.source} />
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ['Inscrits', elections_2024.inscrits],
              ['Votants', elections_2024.votants],
              ['Suffrages exprimés', elections_2024.suffrages_exprimes],
              ['Participation', `${elections_2024.taux_participation_pct}%`],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-lg bg-[color:var(--color-surface-elevated)] p-4 text-center">
                <div className="text-h3" style={{ fontFamily: 'var(--font-display)' }}>
                  {typeof value === 'number' ? formatNumberFr(value) : value}
                </div>
                <div className="text-small text-[color:var(--color-text-secondary)]">{label}</div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)]">
            <table className="w-full min-w-[560px] text-left text-small">
              <thead>
                <tr className="border-b border-[color:var(--color-border)] text-[color:var(--color-text-muted)]">
                  <th className="px-4 py-3 font-semibold">Liste / Parti</th>
                  <th className="px-4 py-3 font-semibold">Voix</th>
                  <th className="px-4 py-3 font-semibold">%</th>
                  <th className="px-4 py-3 font-semibold">Sièges</th>
                  <th className="px-4 py-3 font-semibold">Répartition</th>
                </tr>
              </thead>
              <tbody>
                {elections_2024.resultats.map((r) => (
                  <tr key={r.parti} className="border-b border-[color:var(--color-border)] last:border-0">
                    <td className="px-4 py-3 font-semibold">{r.parti}</td>
                    <td className="px-4 py-3">{formatNumberFr(r.voix)}</td>
                    <td className="px-4 py-3">{r.pct}%</td>
                    <td className="px-4 py-3">{r.sieges}</td>
                    <td className="px-4 py-3">
                      <div className="h-2 w-full max-w-40 overflow-hidden rounded-full bg-[color:var(--color-surface-muted)]">
                        <div
                          className="h-full rounded-full bg-[color:var(--color-brand-secondary)]"
                          style={{ width: `${(r.voix / maxVoix) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-lg border border-[color:var(--color-a-confirmer)] bg-[color:var(--color-surface-elevated)] p-4">
            <Info size={20} className="mt-0.5 shrink-0 text-[color:var(--color-a-confirmer)]" aria-hidden="true" />
            <p className="text-small text-[color:var(--color-text-secondary)]">{elections_2024.note_contradiction}</p>
          </div>
        </div>
      </section>

      <CanalSeparator />

      <section className="mx-auto max-w-(--max-width-content) px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h2>Les 18 conseillers municipaux</h2>
          <ReliabilityBadge level={data.conseillers_verification} source={data.conseillers_source} />
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conseillers.map((name) => (
            <li
              key={name}
              className="flex items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] p-4"
            >
              <UserRound size={20} className="shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
              <span className="text-body">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <CanalSeparator />

      <section className="bg-[color:var(--color-surface-muted)] py-16">
        <div className="mx-auto max-w-(--max-width-content) px-4 sm:px-6">
          <h2>Tutelle administrative</h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-[color:var(--color-surface-elevated)] p-5">
              <dt className="text-caption text-[color:var(--color-accent-hover)]">Mairie de tutelle</dt>
              <dd className="text-body mt-1">{tutelle.mairie_ville}</dd>
            </div>
            <div className="rounded-lg bg-[color:var(--color-surface-elevated)] p-5">
              <dt className="text-caption text-[color:var(--color-accent-hover)]">Maire de la ville</dt>
              <dd className="text-body mt-1">{tutelle.maire_ville}</dd>
            </div>
            <div className="rounded-lg bg-[color:var(--color-surface-elevated)] p-5">
              <dt className="text-caption text-[color:var(--color-accent-hover)]">Déléguée générale</dt>
              <dd className="text-body mt-1">{tutelle.delegue_general}</dd>
            </div>
            <div className="rounded-lg bg-[color:var(--color-surface-elevated)] p-5">
              <dt className="text-caption text-[color:var(--color-accent-hover)]">Ministère</dt>
              <dd className="text-body mt-1">{tutelle.ministere}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
