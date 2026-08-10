import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 bg-ash px-6 py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Réserver ou nous joindre</h2>
        <p className="mt-2 text-cream/70">
          Aux heures de pointe, la salle se remplit vite. Réservez par téléphone, ou commandez
          à emporter — c&apos;est souvent le plus rapide.
        </p>

        <a
          href={SITE.telephoneHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-ember/20 transition hover:bg-ember-dark"
        >
          Appeler — {SITE.telephone}
        </a>

        <details className="group mt-8">
          <summary className="cursor-pointer list-none font-display font-semibold text-cream/80">
            Ou écrire un message
            <span className="ml-2 text-cream/50 transition group-open:rotate-180" aria-hidden="true">
              ⌄
            </span>
          </summary>
          <ContactForm />
        </details>
      </div>
    </section>
  );
}
