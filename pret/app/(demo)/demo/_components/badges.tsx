import type { Statut, StatutAnomalie, Urgence } from "./types";

function statutColorClasses(statut: Statut) {
  switch (statut) {
    case "vert":
      return { dot: "bg-green", bg: "bg-green-bg", text: "text-green" };
    case "orange":
      return { dot: "bg-amber", bg: "bg-amber-bg", text: "text-amber" };
    case "rouge":
      return { dot: "bg-red", bg: "bg-red-bg", text: "text-red" };
  }
}

function urgenceColorClasses(urgence: Urgence) {
  switch (urgence) {
    case "Faible":
      return { bg: "bg-green-bg", text: "text-green" };
    case "Moyenne":
      return { bg: "bg-amber-bg", text: "text-amber" };
    case "Haute":
    case "Bloquant":
      return { bg: "bg-red-bg", text: "text-red" };
  }
}

function statutAnomalieColorClasses(statut: StatutAnomalie) {
  switch (statut) {
    case "Ouverte":
      return { bg: "bg-red-bg", text: "text-red" };
    case "En cours":
      return { bg: "bg-amber-bg", text: "text-amber" };
    case "Résolue":
      return { bg: "bg-green-bg", text: "text-green" };
  }
}

function Chip({
  text,
  bg,
  textColor,
}: {
  text: string;
  bg: string;
  textColor: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide ${bg} ${textColor}`}
    >
      {text}
    </span>
  );
}

export function LogementStatusChip({
  statut,
  label,
}: {
  statut: Statut;
  label: string;
}) {
  const c = statutColorClasses(statut);
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />
      <Chip text={label} bg={c.bg} textColor={c.text} />
    </span>
  );
}

export function StatutDot({ statut }: { statut: Statut }) {
  const c = statutColorClasses(statut);
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.dot}`} aria-hidden="true" />;
}

export function UrgenceBadge({ urgence }: { urgence: Urgence }) {
  const c = urgenceColorClasses(urgence);
  return <Chip text={urgence} bg={c.bg} textColor={c.text} />;
}

export function StatutAnomalieBadge({ statut }: { statut: StatutAnomalie }) {
  const c = statutAnomalieColorClasses(statut);
  return <Chip text={statut} bg={c.bg} textColor={c.text} />;
}
