export const SITE = {
  nom: "Le Four à Bois",
  ville: "Vire-Normandie",
  adresse: {
    rue: "22 Place de Martilly",
    codePostal: "14500",
    ville: "Vire-Normandie",
    pays: "FR",
  },
  telephone: "02 31 68 99 77",
  telephoneHref: "tel:+33231689977",
  email: "franck.guesnon@gmail.com",
  facebook: "https://www.facebook.com/LeFourABoisPizzeriaVire",
  gps: { lat: 48.845503, lng: -0.8987665 },
  note: 4.4,
  budget: "20–30 € par personne",
  services: [
    "Terrasse",
    "Vente à emporter",
    "Wi-Fi gratuit",
    "Accès PMR",
    "Options végétariennes",
  ],
  paiements: [
    "Espèces",
    "Chèque",
    "Carte bancaire",
    "Ticket Restaurant (papier et carte)",
    "Chèques vacances",
  ],
  mentionsLegales: {
    raisonSociale: "Guesnon (Le Four à Bois)",
    responsable: "Janick Guesnon",
    siren: "837550714",
    capital: "10 000 €",
    greffe: "Caen",
  },
} as const;

export const itineraireUrl = `https://www.google.com/maps/dir/?api=1&destination=${SITE.gps.lat},${SITE.gps.lng}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${SITE.gps.lat},${SITE.gps.lng}&z=17&output=embed`;
