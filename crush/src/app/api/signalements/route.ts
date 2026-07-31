import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

const MOTIFS_VALIDES = ["demande_de_retrait", "mineur", "harcelement", "autre"];

export async function POST(req: Request) {
  const formData = await req.formData();

  const motif = formData.get("motif");
  const details = formData.get("details");
  const reference = formData.get("reference");
  const demandeId = formData.get("demande_id");
  const postId = formData.get("post_id");

  if (typeof motif !== "string" || !MOTIFS_VALIDES.includes(motif)) {
    return NextResponse.json({ error: "Motif invalide." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("signalements").insert({
    motif,
    details: typeof details === "string" ? details.slice(0, 500) : null,
    reference: typeof reference === "string" ? reference.slice(0, 300) : null,
    demande_id: typeof demandeId === "string" && demandeId ? demandeId : null,
    post_id: typeof postId === "string" && postId ? postId : null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer le signalement." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
