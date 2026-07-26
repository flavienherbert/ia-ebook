import type { Anomalie, Intervenant, Logement } from "./types";

export const logementsInitiaux: Logement[] = [
  {
    id: 1,
    nom: "12 rue de la Paix",
    adresse: "12 rue de la Paix, 75002 Paris",
    statut: "vert",
    label: "Prêt",
    heure: "14:32",
    photos: 3,
    anomalyId: null,
    checklist: [
      { label: "Aérer les pièces", fait: true },
      { label: "Changer le linge de lit", fait: true },
      { label: "Nettoyer la salle de bain", fait: true },
      { label: "Vérifier l'équipement cuisine", fait: true },
    ],
  },
  {
    id: 2,
    nom: "8 avenue Foch",
    adresse: "8 avenue Foch, 75116 Paris",
    statut: "orange",
    label: "En cours",
    heure: "—",
    photos: 1,
    anomalyId: null,
    checklist: [
      { label: "Aérer les pièces", fait: true },
      { label: "Changer le linge de lit", fait: true },
      { label: "Nettoyer la salle de bain", fait: false },
      { label: "Vérifier l'équipement cuisine", fait: false },
      { label: "Sortir les poubelles", fait: false },
    ],
  },
  {
    id: 3,
    nom: "3 rue Victor Hugo",
    adresse: "3 rue Victor Hugo, 69002 Lyon",
    statut: "rouge",
    label: "Anomalie bloquante",
    heure: "11:05",
    photos: 2,
    anomalyId: 1,
    checklist: [
      { label: "Aérer les pièces", fait: true },
      { label: "Changer le linge de lit", fait: true },
      { label: "Nettoyer la salle de bain", fait: true },
      { label: "Vérifier l'équipement cuisine", fait: true },
    ],
  },
  {
    id: 4,
    nom: "45 bd Saint-Michel",
    adresse: "45 boulevard Saint-Michel, 75005 Paris",
    statut: "vert",
    label: "Prêt",
    heure: "09:58",
    photos: 4,
    anomalyId: null,
    checklist: [
      { label: "Aérer les pièces", fait: true },
      { label: "Changer le linge de lit", fait: true },
      { label: "Nettoyer la salle de bain", fait: true },
      { label: "Vérifier l'équipement cuisine", fait: true },
    ],
  },
  {
    id: 5,
    nom: "21 rue du Faubourg",
    adresse: "21 rue du Faubourg Saint-Antoine, 75011 Paris",
    statut: "rouge",
    label: "Pas commencé",
    heure: "—",
    photos: 0,
    anomalyId: null,
    checklist: [
      { label: "Aérer les pièces", fait: false },
      { label: "Changer le linge de lit", fait: false },
      { label: "Nettoyer la salle de bain", fait: false },
      { label: "Vérifier l'équipement cuisine", fait: false },
    ],
  },
  {
    id: 6,
    nom: "6 impasse des Lilas",
    adresse: "6 impasse des Lilas, 33000 Bordeaux",
    statut: "orange",
    label: "En cours",
    heure: "—",
    photos: 1,
    anomalyId: null,
    checklist: [
      { label: "Aérer les pièces", fait: true },
      { label: "Changer le linge de lit", fait: false },
      { label: "Nettoyer la salle de bain", fait: false },
      { label: "Vérifier l'équipement cuisine", fait: false },
    ],
  },
];

export const intervenantsInitiaux: Intervenant[] = [
  { id: 1, nom: "Julie Marchand", telephone: "06 12 34 56 78", missions: 14 },
  { id: 2, nom: "Karim Belhadj", telephone: "06 98 76 54 32", missions: 9 },
  { id: 3, nom: "Fatou Diallo", telephone: "06 45 12 78 90", missions: 11 },
];

export const anomaliesInitiales: Anomalie[] = [
  {
    id: 1,
    titre: "Chauffe-eau HS",
    logement: "3 rue Victor Hugo",
    urgence: "Bloquant",
    statut: "Ouverte",
    assignee: "Julie Marchand",
    heure: "11:05",
  },
  {
    id: 2,
    titre: "Ampoule salon grillée",
    logement: "8 avenue Foch",
    urgence: "Faible",
    statut: "En cours",
    assignee: "Karim Belhadj",
    heure: "09:12",
  },
  {
    id: 3,
    titre: "Rideau de douche à remplacer",
    logement: "45 bd Saint-Michel",
    urgence: "Moyenne",
    statut: "Résolue",
    assignee: "Fatou Diallo",
    heure: "Hier 16:40",
  },
];

// Mission fictive du mode intervenant.
export const MISSION_LOGEMENT_ID = 2;
