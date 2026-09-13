import { SeoHead } from '@/components/ui/SeoHead';
import { PageHeader } from '@/components/ui/PageHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import servicesData from '@/data/services.json';
import type { Service } from '@/types';

const services = servicesData as Service[];

export function Services() {
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <>
      <SeoHead
        title="Services municipaux"
        description="Démarches et services proposés par la Mairie du 6ᵉ arrondissement de N'Djaména : état civil, salubrité et cadre de vie."
        path="/services"
      />
      <PageHeader
        eyebrow="Démarches"
        title="Services municipaux"
        description="Retrouvez les démarches proposées par la mairie. Les modalités précises (pièces, délais, coûts) restent à confirmer auprès du service concerné."
      />

      {categories.map((cat) => (
        <section key={cat} className="mx-auto max-w-(--max-width-content) px-4 py-12 sm:px-6">
          <h2 className="mb-8">{cat}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.category === cat)
              .map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
