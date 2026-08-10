export type Service = { debut: string; fin: string } | null;

export type JourHoraire = {
  jour: string;
  jourCourt: string;
  midi: Service;
  soir: Service;
};

// index 0 = dimanche ... 6 = samedi, aligné sur Date#getDay()
export const HORAIRES: JourHoraire[] = [
  { jour: "Dimanche", jourCourt: "Dim", midi: { debut: "12:00", fin: "14:00" }, soir: { debut: "18:45", fin: "21:15" } },
  { jour: "Lundi", jourCourt: "Lun", midi: { debut: "12:00", fin: "14:00" }, soir: { debut: "18:45", fin: "21:15" } },
  { jour: "Mardi", jourCourt: "Mar", midi: { debut: "12:00", fin: "13:45" }, soir: { debut: "18:45", fin: "21:15" } },
  { jour: "Mercredi", jourCourt: "Mer", midi: null, soir: null },
  { jour: "Jeudi", jourCourt: "Jeu", midi: { debut: "12:00", fin: "14:00" }, soir: { debut: "18:45", fin: "21:15" } },
  { jour: "Vendredi", jourCourt: "Ven", midi: { debut: "12:00", fin: "14:00" }, soir: { debut: "18:45", fin: "22:00" } },
  { jour: "Samedi", jourCourt: "Sam", midi: { debut: "12:00", fin: "14:00" }, soir: { debut: "18:45", fin: "22:00" } },
];
