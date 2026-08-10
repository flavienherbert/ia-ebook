import PizzaCard from "@/components/menu/PizzaCard";
import type { PizzaCategorie } from "@/lib/menu";

export default function PizzaCategorySection({
  id,
  categorie,
}: {
  id: string;
  categorie: PizzaCategorie;
}) {
  return (
    <section id={id} className="scroll-mt-16 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold text-char sm:text-2xl">
          {categorie.titre}
        </h3>
        <p className="text-sm text-char/50">
          Tailles : {categorie.tailles.join(" · ")}
        </p>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {categorie.items.map((item) => (
          <PizzaCard key={item.nom} item={item} tailles={categorie.tailles} />
        ))}
      </ul>
    </section>
  );
}
