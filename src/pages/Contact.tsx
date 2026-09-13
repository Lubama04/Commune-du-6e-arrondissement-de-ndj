import { useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { CanalSeparator } from '@/components/ui/CanalSeparator';
import { ReliabilityBadge } from '@/components/ui/ReliabilityBadge';
import { MapEmbed } from '@/components/ui/MapEmbed';
import commune from '@/data/commune.json';
import type { Commune } from '@/types';

const data = commune as Commune;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Aucun back-end de messagerie disponible pour ce MVP : le formulaire
    // confirme la saisie côté client. Intégration Supabase/API prévue en v2.
    setSubmitted(true);
  }

  return (
    <>
      <SeoHead
        title="Contact"
        description="Contactez la Mairie du 6ᵉ arrondissement de N'Djaména."
        path="/contact"
      />
      <PageHeader eyebrow="Nous joindre" title="Contact" description="Une question, une réclamation ? Contactez la mairie." />

      <section className="mx-auto max-w-(--max-width-content) grid gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <div>
              <div className="text-body">{data.mairie_address}</div>
              <ReliabilityBadge level="non_trouve" />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={20} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <div>
              <div className="text-body">{data.mairie_phone}</div>
              <ReliabilityBadge level={data.mairie_phone_verification} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={20} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <div>
              <div className="text-body">Email non communiqué</div>
              <ReliabilityBadge level={data.mairie_email_verification} />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={20} className="mt-0.5 shrink-0 text-[color:var(--color-brand-secondary)]" aria-hidden="true" />
            <div>
              <div className="text-body">{data.mairie_hours}</div>
              <ReliabilityBadge level="non_trouve" />
            </div>
          </div>

          <CanalSeparator align="left" tight />
          <MapEmbed height={280} />
        </div>

        <div>
          {submitted ? (
            <div className="rounded-lg border border-[color:var(--color-verifie)] bg-[color:var(--color-surface-muted)] p-8 text-center">
              <h2 className="text-h3">Message enregistré</h2>
              <p className="text-body mt-3 text-[color:var(--color-text-secondary)]">
                Votre message a bien été saisi. La transmission automatisée vers les services de
                la mairie sera activée dès l'intégration du back-office (v2).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Formulaire de contact">
              <div>
                <label htmlFor="name" className="text-small mb-1 block font-medium">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] px-4 py-2.5"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-small mb-1 block font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] px-4 py-2.5"
                />
              </div>
              <div>
                <label htmlFor="subject" className="text-small mb-1 block font-medium">
                  Objet
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] px-4 py-2.5"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-small mb-1 block font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)] px-4 py-2.5"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[color:var(--color-brand-secondary)]"
              >
                <Send size={18} aria-hidden="true" /> Envoyer le message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
