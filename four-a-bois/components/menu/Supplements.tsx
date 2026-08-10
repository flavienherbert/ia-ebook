import { formatPrix, type Supplement } from "@/lib/menu";

export default function Supplements({
  supplements,
  tailles,
}: {
  supplements: Supplement[];
  tailles: [string, string, string];
}) {
  return (
    <div className="mt-8 rounded-2xl bg-flour-dark/60 p-4 sm:p-5">
      <h4 className="font-display text-sm font-bold uppercase tracking-wide text-char/70">
        Suppléments
      </h4>
      <ul className="mt-3 space-y-2">
        {supplements.map((supplement) => (
          <li
            key={supplement.nom}
            className="flex flex-wrap items-center justify-between gap-2 text-sm text-char/80"
          >
            <span>{supplement.nom}</span>
            <span className="font-medium">
              {supplement.prix
                .map((prix, index) => `${tailles[index]} ${formatPrix(prix)}`)
                .join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
