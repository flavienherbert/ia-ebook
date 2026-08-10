const CATEGORIES = [
  { id: "pizzas-tomate", label: "Pizzas tomate" },
  { id: "pizzas-creme", label: "Pizzas crème" },
  { id: "burgers", label: "Burgers" },
  { id: "pates", label: "Pâtes" },
  { id: "salades-froides", label: "Salades froides" },
  { id: "salades-chaudes", label: "Salades chaudes" },
  { id: "a-partager", label: "À partager" },
  { id: "desserts", label: "Desserts" },
];

export default function CategoryNav() {
  return (
    <nav
      aria-label="Catégories de la carte"
      className="sticky top-0 z-10 -mx-6 overflow-x-auto bg-flour/95 px-6 py-3 backdrop-blur"
    >
      <ul className="flex w-max gap-2">
        {CATEGORIES.map((categorie) => (
          <li key={categorie.id}>
            <a
              href={`#${categorie.id}`}
              className="block whitespace-nowrap rounded-full border border-char/15 px-4 py-2 text-sm font-medium text-char/80 transition hover:border-ember hover:text-char"
            >
              {categorie.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
