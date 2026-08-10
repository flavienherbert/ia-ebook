import { formatPrix, type PizzaItem } from "@/lib/menu";

export default function PizzaCard({
  item,
  tailles,
}: {
  item: PizzaItem;
  tailles: [string, string, string];
}) {
  return (
    <li className="rounded-2xl border border-char/10 bg-white/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-base font-bold text-char sm:text-lg">{item.nom}</h3>
        {item.specialite && (
          <span className="rounded-full bg-bocage px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cream">
            Spécialité normande
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-char/70">{item.ingredients}</p>

      {item.prixUnique !== undefined ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-char">
            {formatPrix(item.prixUnique)}
          </span>
          {item.aConfirmer && (
            <span className="rounded-full border border-dashed border-char/30 px-2 py-0.5 text-[11px] text-char/60">
              Prix à confirmer
            </span>
          )}
        </div>
      ) : (
        item.prix && (
          <div className="mt-3 grid grid-cols-3 divide-x divide-char/10 rounded-lg bg-flour-dark/60">
            {item.prix.map((prix, index) => (
              <div key={tailles[index]} className="px-1 py-2 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-char/50">
                  {tailles[index]}
                </div>
                <div className="font-display text-sm font-bold text-char sm:text-base">
                  {formatPrix(prix)}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </li>
  );
}
