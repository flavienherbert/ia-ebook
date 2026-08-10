import { HORAIRES } from "@/data/hours";
import { SITE, itineraireUrl, mapsEmbedUrl } from "@/lib/site";

function formatService(service: { debut: string; fin: string } | null) {
  if (!service) return "Fermé";
  return `${service.debut.replace(":", "h")} – ${service.fin.replace(":", "h")}`;
}

// Affiche la semaine du lundi au dimanche, alignée sur l'ordre HORAIRES (dimanche en index 0).
const ORDRE_AFFICHAGE = [1, 2, 3, 4, 5, 6, 0];

export default function PracticalInfo() {
  return (
    <section id="infos" className="scroll-mt-16 bg-flour px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-char sm:text-3xl">
          Infos pratiques
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-bold text-char">Horaires</h3>
            <table className="mt-4 w-full border-collapse overflow-hidden rounded-2xl bg-white/70 text-sm">
              <thead>
                <tr className="text-left text-char/50">
                  <th scope="col" className="px-4 py-3 font-medium">
                    Jour
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Midi
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Soir
                  </th>
                </tr>
              </thead>
              <tbody>
                {ORDRE_AFFICHAGE.map((index) => {
                  const jour = HORAIRES[index];
                  const ferme = !jour.midi && !jour.soir;
                  return (
                    <tr
                      key={jour.jour}
                      className={`border-t border-char/10 ${
                        ferme ? "bg-char/5 text-char/40" : "text-char/85"
                      }`}
                    >
                      <th scope="row" className="px-4 py-3 font-semibold">
                        {jour.jour}
                      </th>
                      <td className="px-4 py-3">{formatService(jour.midi)}</td>
                      <td className="px-4 py-3">{formatService(jour.soir)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-char">Moyens de paiement</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SITE.paiements.map((paiement) => (
                  <li
                    key={paiement}
                    className="rounded-full border border-char/15 px-3 py-1.5 text-sm text-char/80"
                  >
                    {paiement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-char">Services</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SITE.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-char/15 px-3 py-1.5 text-sm text-char/80"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-char">Adresse</h3>
            <p className="mt-3 text-char/80">
              {SITE.adresse.rue}
              <br />
              {SITE.adresse.codePostal} {SITE.adresse.ville}
            </p>
            <a
              href={itineraireUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-ember-dark underline underline-offset-2"
            >
              Ouvrir l&apos;itinéraire →
            </a>

            <div className="mt-4 overflow-hidden rounded-2xl border border-char/10">
              <iframe
                title={`Carte — ${SITE.nom}`}
                src={mapsEmbedUrl}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
