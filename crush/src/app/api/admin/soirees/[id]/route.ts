import { NextResponse } from "next/server";
import { requireModerateur } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

const STATUTS_VALIDES = ["brouillon", "publiee", "archivee"];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireModerateur();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const statut = body?.statut;

  if (typeof statut !== "string" || !STATUTS_VALIDES.includes(statut)) {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("soirees").update({ statut }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Mise à jour impossible." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
