import { formatPrix, type SimpleItem } from "@/lib/menu";

export default function SimpleCard({ item }: { item: SimpleItem }) {
  return (
    <li className="flex items-start justify-between gap-4 rounded-2xl border border-char/10 bg-white/60 p-4 sm:p-5">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="font-display text-base font-bold text-char sm:text-lg">{item.nom}</h3>
          {item.specialite && (
            <span className="rounded-full bg-bocage px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cream">
              Spécialité normande
            </span>
          )}
        </div>
        {item.ingredients && <p className="mt-1 text-sm text-char/70">{item.ingredients}</p>}
      </div>
      <span className="shrink-0 font-display text-base font-bold text-char">
        {formatPrix(item.prix)}
      </span>
    </li>
  );
}
