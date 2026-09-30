import type { Service } from "@/components/service-card";
import washFoldPhoto from "@/assets/img/services/wash-fold.webp";
import dryCleaningPhoto from "@/assets/img/services/dry-cleaning.webp";
import beddingPhoto from "@/assets/img/services/bedding.webp";
import shirtPressPhoto from "@/assets/img/services/shirt-press.jpg";
import suitCarePhoto from "@/assets/img/services/suit-care.jpg";
import comforterPhoto from "@/assets/img/services/comforter.jpg";
import knitwearPhoto from "@/assets/img/services/knitwear.jpg";
import delicatesPhoto from "@/assets/img/services/delicates.jpg";
import steamingPhoto from "@/assets/img/services/steaming.jpg";
import shoeCarePhoto from "@/assets/img/services/shoe-care.jpg";
import deliveryPhoto from "@/assets/img/services/delivery.jpg";
import stainPhoto from "@/assets/img/services/stain.jpg";
import monthlyPhoto from "@/assets/img/services/monthly.jpg";

export const services: Service[] = [
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
    icon: "shirt",
    image: shirtPressPhoto,
    title: "Shirt Press & Iron",
    badge: "Crisp Finish",
    body: "Steam-pressed collars and cuffs, hung on hangers and ready for the office.",
    price: "$2.25",
    unit: "/ shirt",
    cta: "Add",
    featured: false,
  },
];

const more = (
  icon: Service["icon"],
  image: Service["image"],
  title: string,
  badge: string,
  body: string,
  price: string,
  unit: string,
): Service => ({ icon, image, title, badge, body, price, unit, cta: "Add", featured: false });

/** Full catalog for the services page (the landing page shows only the first four). */
export const allServices: Service[] = [
  ...services,
  more("leaf", suitCarePhoto, "Jacket & Coat Care", "Tailored", "Careful cleaning and shaping for jackets, blazers and coats with a structured press.", "$12.00", "/ item"),
  more("bed", comforterPhoto, "Comforter Cleaning", "Deep Clean", "Oversized machines lift dust, dander and odors from king and queen comforters.", "$24.00", "/ item"),
  more("leaf", knitwearPhoto, "Knitwear Care", "Gentle", "Shape-safe cleaning for wool, cashmere and chunky knits, dried flat to prevent stretching.", "$7.50", "/ item"),
  more("leaf", delicatesPhoto, "Delicates & Blouses", "Delicate", "Hand-finished care for lace, silk and embroidered pieces, returned on hangers.", "$6.00", "/ item"),
  more("shirt", steamingPhoto, "Wardrobe Steaming", "Refresh", "Quick steam treatment removes wrinkles and odors from tees, dresses and jackets.", "$2.50", "/ item"),
  more("shirt", shoeCarePhoto, "Shoe & Sneaker Care", "Fresh Kicks", "Hand scrubbed with gentle foam and soft brushes: professional deep cleaning for suede, leather and canvas sneakers.", "$14.00", "/ pair"),
  more("bolt", deliveryPhoto, "Same-Day Delivery", "Fast", "Order before noon and get clean clothes back the same evening.", "+25%", "flat surcharge"),
  more("leaf", stainPhoto, "Stain Removal Treatment", "Add-on", "Targeted pre-treatment for wine, oil, ink and sweat stains before any wash.", "$3.00", "/ item"),
  more("shirt", monthlyPhoto, "Monthly Laundry Plan", "Best Value", "Scheduled weekly pickups with a fixed monthly price for busy households.", "$49.00", "/ month"),
];

export const slugify = (title: string) =>
  title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const getService = (slug: string) => allServices.find((s) => slugify(s.title) === slug);
