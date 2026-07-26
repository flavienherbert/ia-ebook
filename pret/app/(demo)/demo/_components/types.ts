export type Statut = "vert" | "orange" | "rouge";

export interface ChecklistItem {
  label: string;
  fait: boolean;
}

export interface Logement {
  id: number;
  nom: string;
  adresse: string;
  statut: Statut;
  label: string;
  heure: string;
  photos: number;
  checklist: ChecklistItem[];
  anomalyId: number | null;
}

export interface Intervenant {
  id: number;
  nom: string;
  telephone: string;
  missions: number;
}

// Le formulaire de signalement (mode intervenant) propose "Haute" en plus des
// trois niveaux déjà présents dans les anomalies existantes.
export type Urgence = "Faible" | "Moyenne" | "Haute" | "Bloquant";
export type StatutAnomalie = "Ouverte" | "En cours" | "Résolue";

export interface Anomalie {
  id: number;
  titre: string;
  logement: string;
  urgence: Urgence;
  statut: StatutAnomalie;
  assignee: string;
  heure: string;
}

export type Vue =
  | "aujourdhui"
  | "logements"
  | "intervenants"
  | "anomalies"
  | "parametres";
