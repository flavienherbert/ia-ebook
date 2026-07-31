import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Signalement } from "@/lib/types";
import SignalementActions from "@/components/SignalementActions";

export const dynamic = "force-dynamic";

export default async function AdminSignalementsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: signalements } = await supabase
    .from("signalements")
    .select("*")
    .eq("statut", "ouvert")
    .order("created_at", { ascending: true })
    .returns<Signalement[]>();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        Signalements ouverts ({signalements?.length ?? 0})
      </h1>

      {!signalements || signalements.length === 0 ? (
        <p className="text-white/50">Aucun signalement en attente.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {signalements.map((s) => (
            <div key={s.id} className="rounded-lg border border-white/10 p-4">
              <p className="text-xs text-white/40">
                {new Date(s.created_at).toLocaleString("fr-FR")} · {s.motif}
              </p>
              {s.reference && (
                <p className="mt-1 break-all text-sm text-white/70">{s.reference}</p>
              )}
              {s.details && <p className="mt-1 text-sm">{s.details}</p>}
              <div className="mt-3">
                <SignalementActions signalementId={s.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
