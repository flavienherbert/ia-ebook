export type StatutSoiree = "brouillon" | "publiee" | "archivee";
export type StatutDemande = "en_attente" | "approuvee" | "rejetee" | "publiee";
export type StatutSignalement = "ouvert" | "traite";

export interface Boite {
  id: string;
  nom: string;
  slug: string;
  instagram_handle: string | null;
  created_at: string;
}

export interface Soiree {
  id: string;
  boite_id: string;
  date_soiree: string;
  libelle: string;
  statut: StatutSoiree;
  created_at: string;
}

export interface Photo {
  id: string;
  soiree_id: string;
  storage_path: string;
  largeur: number | null;
  hauteur: number | null;
  ordre: number;
  created_at: string;
}

export interface Demande {
  id: string;
  photo_id: string | null;
  upload_path: string | null;
  soiree_id: string;
  description: string | null;
  message_utilisateur: string;
  contact_demandeur: string | null;
  statut: StatutDemande;
  motif_rejet: string | null;
  ip_hash: string | null;
  moderateur_id: string | null;
  created_at: string;
  moderated_at: string | null;
}

export interface PostGenere {
  id: string;
  demande_id: string;
  image_path: string;
  image_url_publique: string | null;
  publie_le: string | null;
  instagram_media_id: string | null;
  created_at: string;
}

export interface Signalement {
  id: string;
  post_id: string | null;
  demande_id: string | null;
  reference: string | null;
  motif: string;
  details: string | null;
  statut: StatutSignalement;
  created_at: string;
}
