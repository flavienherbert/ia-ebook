export const mainNav = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks = [
  { label: "Création de site vitrine", href: "/services/site-vitrine" },
  { label: "Site e-commerce", href: "/services/site-ecommerce" },
  { label: "SEO & référencement", href: "/services/seo" },
  { label: "Publicité Meta", href: "/services/publicite-meta" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "Automatisation & IA", href: "/services/automatisation-ia" },
];

export const footerLegalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Conditions générales", href: "/conditions-generales" },
];

// Coordonnées de l'entreprise : personnalisez ces champs avec vos informations réelles
// avant la mise en ligne (voir GUIDE-PERSONNALISATION.md, section "Coordonnées").
export const siteConfig = {
  name: "Klarim",
  tagline: "L'agence digitale qui donne de la clarté à votre stratégie et des résultats à votre croissance.",
  url: "https://klarim.fr",
  email: "contact@klarim.fr",
  phone: "+33 1 84 60 12 30",
  address: "12 rue de la Clarté, 75011 Paris, France",
  hours: [
    { day: "Lundi – Vendredi", hours: "9h00 – 18h30" },
    { day: "Samedi", hours: "Sur rendez-vous" },
    { day: "Dimanche", hours: "Fermé" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "X (Twitter)", href: "https://www.x.com" },
  ],
  // Lien de prise de rendez-vous (Calendly, Cal.com...) : remplacez par votre lien réel.
  // Tant que ce champ reste vide, le site affiche un bouton de contact classique à la place.
  bookingUrl: "",
};
