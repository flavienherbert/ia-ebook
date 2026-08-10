const POINTS = [
  {
    titre: "Feu de bois",
    texte: "Le four chauffe au bois. Le pizzaiolo travaille devant vous, pas derrière un écran.",
  },
  {
    titre: "Fait maison",
    texte: "Pâte, sauces, lasagnes : tout est préparé sur place, tous les jours.",
  },
  {
    titre: "Produits normands",
    texte: "L'andouille de Vire « Asselot » revient sur plusieurs plats de la carte. C'est notre région, dans l'assiette.",
  },
];

export default function Spirit() {
  return (
    <section className="bg-flour px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-char sm:text-3xl">
          L&apos;esprit de la maison
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.titre}>
              <h3 className="font-display text-lg font-bold text-char">{point.titre}</h3>
              <p className="mt-2 text-char/75">{point.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
