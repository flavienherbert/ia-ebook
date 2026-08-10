import { HORAIRES } from "@/data/hours";
import { SITE } from "@/lib/site";

const JOURS_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function buildRestaurantJsonLd() {
  const openingHoursSpecification = HORAIRES.flatMap((jour, index) => {
    const dayOfWeek = JOURS_EN[index];
    return [jour.midi, jour.soir]
      .filter((service): service is NonNullable<typeof service> => Boolean(service))
      .map((service) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: service.debut,
        closes: service.fin,
      }));
  });

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.nom,
    image: "https://lefourabois-vire.fr/hero.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.adresse.rue,
      postalCode: SITE.adresse.codePostal,
      addressLocality: SITE.adresse.ville,
      addressCountry: SITE.adresse.pays,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.gps.lat,
      longitude: SITE.gps.lng,
    },
    telephone: SITE.telephoneHref.replace("tel:", ""),
    email: SITE.email,
    servesCuisine: ["Italienne", "Pizza", "Française"],
    priceRange: "€€",
    paymentAccepted: SITE.paiements.join(", "),
    hasMenu: "https://lefourabois-vire.fr/#carte",
    openingHoursSpecification,
    sameAs: [SITE.facebook],
  };
}
