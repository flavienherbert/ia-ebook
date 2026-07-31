import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/server";
import type { Soiree } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AccueilPage() {
  const supabase = createPublicClient();

  const { data: soirees } = await supabase
    .from("soirees")
    .select("*")
    .eq("statut", "publiee")
    .order("date_soiree", { ascending: false })
    .returns<Soiree[]>();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Retrouve ta rencontre</h1>
      <p className="mb-8 text-white/60">
        Choisis la soirée pendant laquelle tu as croisé quelqu&apos;un, puis la
        photo où il ou elle apparaît.
      </p>

      {!soirees || soirees.length === 0 ? (
        <p className="text-white/50">Aucune soirée publiée pour le moment.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {soirees.map((soiree) => (
            <li key={soiree.id}>
              <Link
                href={`/soiree/${soiree.id}`}
                className="block rounded-lg border border-white/10 px-4 py-3 transition hover:border-[var(--accent)]"
              >
                <span className="font-medium">{soiree.libelle}</span>
                <span className="block text-sm text-white/50">
                  {new Date(soiree.date_soiree).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
