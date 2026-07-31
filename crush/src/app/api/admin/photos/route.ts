import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireModerateur } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const user = await requireModerateur();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const formData = await req.formData();
  const soireeId = formData.get("soiree_id");
  const fichiers = formData.getAll("fichiers").filter((f) => f instanceof File) as File[];

  if (typeof soireeId !== "string" || !soireeId) {
    return NextResponse.json({ error: "Soirée manquante." }, { status: 400 });
  }
  if (fichiers.length === 0) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  const { data: soiree } = await supabase
    .from("soirees")
    .select("id")
    .eq("id", soireeId)
    .maybeSingle();
  if (!soiree) {
    return NextResponse.json({ error: "Soirée introuvable." }, { status: 404 });
  }

  const { count: ordreDepart } = await supabase
    .from("photos")
    .select("id", { count: "exact", head: true })
    .eq("soiree_id", soireeId);

  const photosInserees = [];
  for (let i = 0; i < fichiers.length; i++) {
    const fichier = fichiers[i];
    if (!fichier.type.startsWith("image/")) continue;

    const extension = fichier.type === "image/png" ? "png" : "jpg";
    const path = `soirees/${soireeId}/${randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("crush-photos")
      .upload(path, fichier, { contentType: fichier.type });
    if (uploadError) continue;

    const { data: photo, error: insertError } = await supabase
      .from("photos")
      .insert({
        soiree_id: soireeId,
        storage_path: path,
        ordre: (ordreDepart ?? 0) + i,
      })
      .select("*")
      .single();
    if (!insertError && photo) photosInserees.push(photo);
  }

  return NextResponse.json({ photos: photosInserees }, { status: 201 });
}
