import { NextResponse } from "next/server";
import { requireModerateur } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

const BOITE_SLUG_DEFAUT = "boite-principale";

/** Une seule boîte au démarrage : on la crée si elle n'existe pas encore. */
async function getOuCreerBoiteParDefaut(
  supabase: ReturnType<typeof createServiceRoleClient>
) {
  const { data: existante } = await supabase
    .from("boites")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (existante) return existante.id;

  const { data: nouvelle, error } = await supabase
    .from("boites")
    .insert({ nom: "Ma boîte", slug: BOITE_SLUG_DEFAUT })
    .select("id")
    .single();
  if (error || !nouvelle) throw new Error("Impossible de créer la boîte par défaut.");
  return nouvelle.id;
}

export async function POST(req: Request) {
  const user = await requireModerateur();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const libelle = body?.libelle;
  const dateSoiree = body?.date_soiree;

  if (typeof libelle !== "string" || !libelle.trim()) {
    return NextResponse.json({ error: "Libellé requis." }, { status: 400 });
  }
  if (typeof dateSoiree !== "string" || !dateSoiree) {
    return NextResponse.json({ error: "Date requise." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  try {
    const boiteId = await getOuCreerBoiteParDefaut(supabase);
    const { data: soiree, error } = await supabase
      .from("soirees")
      .insert({ boite_id: boiteId, libelle, date_soiree: dateSoiree, statut: "brouillon" })
      .select("*")
      .single();

    if (error || !soiree) throw error ?? new Error("Création impossible.");
    return NextResponse.json({ soiree }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Création impossible." }, { status: 500 });
  }
}
