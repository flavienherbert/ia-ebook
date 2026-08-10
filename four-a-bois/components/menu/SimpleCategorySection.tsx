import SimpleCard from "@/components/menu/SimpleCard";
import type { SimpleCategorie } from "@/lib/menu";

export default function SimpleCategorySection({
  id,
  categorie,
}: {
  id: string;
  categorie: SimpleCategorie;
}) {
  return (
    <section id={id} className="scroll-mt-16 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-bold text-char sm:text-2xl">
          {categorie.titre}
        </h3>
        {categorie.note && <p className="text-sm text-char/50">{categorie.note}</p>}
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {categorie.items.map((item) => (
          <SimpleCard key={item.nom} item={item} />
        ))}
      </ul>
    </section>
  );
}
