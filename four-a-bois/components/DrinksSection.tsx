import BoissonCategoryBlock from "@/components/menu/BoissonCategoryBlock";
import { menu } from "@/lib/menu";

export default function DrinksSection() {
  return (
    <section id="boissons" className="scroll-mt-16 bg-ash px-6 py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Boissons & vins</h2>
        <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-dashed border-cream/30 px-3 py-1.5 text-sm text-cream/70">
          Prix indicatifs — nous consulter
        </p>

        <details className="group mt-6">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl bg-ash-light px-5 py-4 font-display font-semibold">
            Voir la carte des boissons &amp; des vins
            <span className="text-cream/50 transition group-open:rotate-180" aria-hidden="true">
              ⌄
            </span>
          </summary>

          <div className="mt-6 space-y-8">
            <div>
              <h3 className="font-display text-lg font-bold">{menu.vins.titre}</h3>
              <div className="mt-4 space-y-6">
                {menu.vins.categories.map((categorie) => (
                  <BoissonCategoryBlock key={categorie.nom} categorie={categorie} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold">{menu.boissons.titre}</h3>
              <div className="mt-4 space-y-6">
                {menu.boissons.categories.map((categorie) => (
                  <BoissonCategoryBlock key={categorie.nom} categorie={categorie} />
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
