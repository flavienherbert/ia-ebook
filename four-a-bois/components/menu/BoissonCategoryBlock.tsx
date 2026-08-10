import { formatPrix, type BoissonCategorie } from "@/lib/menu";

export default function BoissonCategoryBlock({ categorie }: { categorie: BoissonCategorie }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wide text-cream/60">
        {categorie.nom}
      </h4>
      <ul className="mt-2 space-y-2">
        {categorie.items.map((item) => (
          <li
            key={item.nom}
            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-cream/10 pb-2 text-sm"
          >
            <span className="text-cream/85">
              {item.nom}
              {item.specialite && (
                <span className="ml-2 rounded-full bg-bocage px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream">
                  Spécialité normande
                </span>
              )}
              {item.ingredients && (
                <span className="block text-xs text-cream/50">{item.ingredients}</span>
              )}
            </span>
            <span className="font-medium text-cream">
              {Array.isArray(item.prix)
                ? item.prix
                    .map((prix, index) =>
                      prix === null ? null : `${categorie.formats?.[index] ?? ""} ${formatPrix(prix)}`,
                    )
                    .filter(Boolean)
                    .join(" · ")
                : formatPrix(item.prix)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
