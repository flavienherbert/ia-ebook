import data from "@/data/menu.json";

export type PizzaItem = {
  nom: string;
  ingredients: string;
  prix?: [number, number, number];
  prixUnique?: number;
  aConfirmer?: boolean;
  specialite?: boolean;
};

export type PizzaCategorie = {
  titre: string;
  tailles: [string, string, string];
  items: PizzaItem[];
};

export type SimpleItem = {
  nom: string;
  ingredients?: string;
  prix: number;
  specialite?: boolean;
};

export type SimpleCategorie = {
  titre: string;
  note?: string;
  items: SimpleItem[];
};

export type Supplement = {
  nom: string;
  prix: [number, number, number];
};

export type BoissonFormatItem = {
  nom: string;
  ingredients?: string;
  prix: number | (number | null)[];
  specialite?: boolean;
};

export type BoissonCategorie = {
  nom: string;
  formats?: string[];
  items: BoissonFormatItem[];
};

export type BoissonsSection = {
  titre: string;
  prixIndicatifs: boolean;
  categories: BoissonCategorie[];
};

export const menu = data as unknown as {
  pizzasTomate: PizzaCategorie;
  pizzasCreme: PizzaCategorie;
  supplements: Supplement[];
  burgers: SimpleCategorie;
  pates: SimpleCategorie;
  saladesFroides: SimpleCategorie;
  saladesChaudes: SimpleCategorie;
  aPartager: SimpleCategorie;
  desserts: SimpleCategorie;
  vins: BoissonsSection;
  boissons: BoissonsSection;
};

export const formatPrix = (valeur: number) =>
  `${valeur.toFixed(2).replace(".", ",")} €`;
