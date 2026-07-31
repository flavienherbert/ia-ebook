import { NextResponse } from "next/server";
import { requireModerateur } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireModerateur();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const supprimerCible = body?.supprimer_cible === true;

  const supabase = createServiceRoleClient();

  const { data: signalement } = await supabase
    .from("signalements")
    .select("id, post_id, demande_id")
    .eq("id", id)
    .maybeSingle();
  if (!signalement) {
    return NextResponse.json({ error: "Signalement introuvable." }, { status: 404 });
  }

  if (supprimerCible) {
    // Supprime la demande (cascade sur son post_généré éventuel) pour
    // retirer le contenu signalé, conformément au droit de retrait.
    if (signalement.demande_id) {
      await supabase.from("demandes").delete().eq("id", signalement.demande_id);
    } else if (signalement.post_id) {
      const { data: post } = await supabase
        .from("posts_generes")
        .select("demande_id")
        .eq("id", signalement.post_id)
        .maybeSingle();
      if (post?.demande_id) {
        await supabase.from("demandes").delete().eq("id", post.demande_id);
      }
    }
  }

  const { error } = await supabase
    .from("signalements")
    .update({ statut: "traite" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Mise à jour impossible." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
