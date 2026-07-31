import { NextResponse } from "next/server";
import { requireModerateur } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireModerateur();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const action = body?.action;

  if (action !== "approuver" && action !== "rejeter") {
    return NextResponse.json({ error: "Action invalide." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: demande } = await supabase
    .from("demandes")
    .select("id, statut")
    .eq("id", id)
    .maybeSingle();

  if (!demande) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }
  if (demande.statut !== "en_attente") {
    return NextResponse.json(
      { error: "Cette demande a déjà été modérée." },
      { status: 409 }
    );
  }

  if (action === "rejeter") {
    const motifRejet = typeof body?.motif_rejet === "string" ? body.motif_rejet : null;
    await supabase
      .from("demandes")
      .update({
        statut: "rejetee",
        motif_rejet: motifRejet,
        moderateur_id: user.id,
        moderated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ statut: "rejetee" });
  }

  // Approbation : on marque la demande approuvée puis on génère le visuel.
  await supabase
    .from("demandes")
    .update({
      statut: "approuvee",
      moderateur_id: user.id,
      moderated_at: new Date().toISOString(),
    })
    .eq("id", id);

  try {
    const origin = new URL(req.url).origin;
    const ogRes = await fetch(`${origin}/api/og/post/${id}`);
    if (!ogRes.ok) throw new Error("Génération de l'image impossible.");

    const arrayBuffer = await ogRes.arrayBuffer();
    const imagePath = `${id}.png`;

    const { error: uploadError } = await supabase.storage
      .from("crush-posts")
      .upload(imagePath, Buffer.from(arrayBuffer), {
        contentType: "image/png",
        upsert: true,
      });
    if (uploadError) throw uploadError;

    const { data: pub } = supabase.storage.from("crush-posts").getPublicUrl(imagePath);

    await supabase.from("posts_generes").upsert(
      {
        demande_id: id,
        image_path: imagePath,
        image_url_publique: pub.publicUrl,
      },
      { onConflict: "demande_id" }
    );

    return NextResponse.json({ statut: "approuvee", image_url: pub.publicUrl });
  } catch {
    // La demande reste approuvée même si la génération a échoué : le
    // modérateur pourra relancer la génération depuis la page de détail.
    return NextResponse.json(
      { statut: "approuvee", erreur_generation: true },
      { status: 207 }
    );
  }
}
