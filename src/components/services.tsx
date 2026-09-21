import { sectionX } from "@/lib/layout";
import { ServiceCard, type Service } from "@/components/service-card";
import { ServicesCarousel } from "@/components/services-carousel";
import washFoldPhoto from "@/assets/img/services/wash-fold.jpg";
import dryCleaningPhoto from "@/assets/img/services/dry-cleaning.jpg";
import beddingPhoto from "@/assets/img/services/bedding.jpg";
import expressPhoto from "@/assets/img/services/express.jpg";

const services: Service[] = [
  {
    icon: "shirt",
    image: washFoldPhoto,
    title: "Wash & Fold",
    badge: "Bestseller",
    body: "Sorted by color, gently washed with hypoallergenic detergents, dried at low temps, and precision-folded.",
    price: "$1.99",
    unit: "/ lb",
    cta: "Add",
    featured: false,
  },
  {
    icon: "leaf",
    image: dryCleaningPhoto,
    title: "Eco Dry Cleaning",
    badge: "Solvent-Free",
    body: "Non-toxic, odor-free hydrocarbon gentle care. Ideal for blazers, cashmere sweaters, and evening dresses.",
    price: "$4.50",
    unit: "/ item",
    cta: "Add",
    featured: false,
  },
  {
    icon: "bed",
    image: beddingPhoto,
    title: "Bedding Spa",
    badge: "Down Sanitized",
    body: "Deep thermal sanitization for comforters, duvet covers, and goose-down pillows with allergen extraction.",
    price: "$18.00",
    unit: "/ set",
    cta: "Add",
    featured: false,
  },
  {
    icon: "bolt",
    image: expressPhoto,
    title: "Express 12h Rush",
    badge: "Priority",
    body: "Morning pickup by 8:00 AM, back on your hanger before dinner at 8:00 PM. Guaranteed rapid service.",
    price: "+35%",
    unit: "flat surcharge",
    cta: "Reserve",
    featured: true,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className={`bg-band py-16 md:py-20 lg:py-24 ${sectionX}`}
    >
      <div className="text-center" data-aos="fade-up">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs">
          Menu of Services
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Tailored Wardrobe Care
        </h2>
        <p className="mt-3 text-sm text-muted md:text-base">
          Engineered formulas and precision folding for every textile category.
        </p>
      </div>

      {/* mobile: one card at a time, auto-advancing + swipe/arrow/dot controls */}
      <div className="mt-10 sm:hidden" data-aos="fade-up" data-aos-delay="100">
        <ServicesCarousel services={services} />
      </div>

      {/* tablet / desktop: full grid, hover to reveal detail */}
      <ul className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-4 lg:gap-6">
        {services.map((service, i) => (
          <li
            key={service.title}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </section>
  );
}
