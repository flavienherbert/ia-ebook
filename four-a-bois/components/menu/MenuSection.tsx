import CategoryNav from "@/components/menu/CategoryNav";
import PizzaCategorySection from "@/components/menu/PizzaCategorySection";
import SimpleCategorySection from "@/components/menu/SimpleCategorySection";
import Supplements from "@/components/menu/Supplements";
import { menu } from "@/lib/menu";

export default function MenuSection() {
  return (
    <section id="carte" className="scroll-mt-0 bg-flour px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-char sm:text-3xl">La carte</h2>
        <p className="mt-2 text-char/70">
          Prix relevés sur la carte affichée en salle. Photos non contractuelles — sauf
          erreurs typographiques.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <CategoryNav />

        <PizzaCategorySection id="pizzas-tomate" categorie={menu.pizzasTomate} />
        <PizzaCategorySection id="pizzas-creme" categorie={menu.pizzasCreme} />
        <Supplements supplements={menu.supplements} tailles={menu.pizzasTomate.tailles} />

        <SimpleCategorySection id="burgers" categorie={menu.burgers} />
        <SimpleCategorySection id="pates" categorie={menu.pates} />
        <SimpleCategorySection id="salades-froides" categorie={menu.saladesFroides} />
        <SimpleCategorySection id="salades-chaudes" categorie={menu.saladesChaudes} />
        <SimpleCategorySection id="a-partager" categorie={menu.aPartager} />
        <SimpleCategorySection id="desserts" categorie={menu.desserts} />
      </div>
    </section>
  );
}
