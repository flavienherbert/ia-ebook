import { HORAIRES, type Service } from "@/data/hours";

export type StatutOuverture = {
  ouvert: boolean;
  message: string;
};

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function parisNow(): { jourIndex: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const parts = fmt.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return {
    jourIndex: WEEKDAY_INDEX[weekday] ?? 0,
    minutes: (hour % 24) * 60 + minute,
  };
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatHeure(time: string): string {
  const [h, m] = time.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
}

export function computeOpenStatus(): StatutOuverture {
  const { jourIndex, minutes } = parisNow();
  const jour = HORAIRES[jourIndex];

  const services: Service[] = [jour.midi, jour.soir];
  for (const service of services) {
    if (service && minutes >= toMinutes(service.debut) && minutes < toMinutes(service.fin)) {
      return { ouvert: true, message: `Ouvert — ferme à ${formatHeure(service.fin)}` };
    }
  }

  // Cherche le prochain service, en partant d'aujourd'hui, sur les 8 prochains jours.
  for (let offset = 0; offset < 8; offset++) {
    const index = (jourIndex + offset) % 7;
    const candidat = HORAIRES[index];
    const candidatsServices: Service[] = [candidat.midi, candidat.soir];

    for (const service of candidatsServices) {
      if (!service) continue;
      if (offset === 0 && toMinutes(service.debut) <= minutes) continue;

      if (offset === 0) {
        return { ouvert: false, message: `Fermé — ouvre aujourd'hui à ${formatHeure(service.debut)}` };
      }
      if (offset === 1) {
        return { ouvert: false, message: `Fermé — ouvre demain à ${formatHeure(service.debut)}` };
      }
      return {
        ouvert: false,
        message: `Fermé — ouvre ${candidat.jour.toLowerCase()} à ${formatHeure(service.debut)}`,
      };
    }
  }

  return { ouvert: false, message: "Fermé" };
}
