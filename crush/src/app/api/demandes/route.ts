import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { estLimitePassee, getClientIp, hashIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const formData = await req.formData();

  const soireeId = formData.get("soiree_id");
  const photoId = formData.get("photo_id");
  const description = formData.get("description");
  const message = formData.get("message_utilisateur");
  const contact = formData.get("contact_demandeur");
  const consentement = formData.get("consentement");
  const fichier = formData.get("fichier");

  if (!consentement) {
    return NextResponse.json({ error: "Consentement requis." }, { status: 400 });
  }
  if (typeof soireeId !== "string" || !soireeId) {
    return NextResponse.json({ error: "Soirée manquante." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message requis." }, { status: 400 });
  }
  const aUnePhotoExistante = typeof photoId === "string" && photoId.length > 0;
  if (!aUnePhotoExistante && !(fichier instanceof File)) {
    return NextResponse.json({ error: "Photo manquante." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const ipHash = hashIp(getClientIp(req));

  if (await estLimitePassee(supabase, ipHash)) {
    return NextResponse.json(
      { error: "Tu as déjà envoyé plusieurs demandes récemment." },
      { status: 429 }
    );
  }

  const { data: soiree } = await supabase
    .from("soirees")
    .select("id")
    .eq("id", soireeId)
    .eq("statut", "publiee")
    .maybeSingle();
  if (!soiree) {
    return NextResponse.json({ error: "Soirée introuvable." }, { status: 404 });
  }

  let uploadPath: string | null = null;
  const finalPhotoId: string | null = aUnePhotoExistante ? (photoId as string) : null;

  if (finalPhotoId) {
    const { data: photo } = await supabase
      .from("photos")
      .select("id")
      .eq("id", finalPhotoId)
      .eq("soiree_id", soireeId)
      .maybeSingle();
    if (!photo) {
      return NextResponse.json({ error: "Photo introuvable." }, { status: 404 });
    }
  } else if (fichier instanceof File) {
    if (fichier.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fichier trop volumineux (8 Mo max)." },
        { status: 400 }
      );
    }
    if (!fichier.type.startsWith("image/")) {
      return NextResponse.json({ error: "Fichier invalide." }, { status: 400 });
    }
    const extension = fichier.type === "image/png" ? "png" : "jpg";
    uploadPath = `uploads/${randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("crush-photos")
      .upload(uploadPath, fichier, { contentType: fichier.type, upsert: false });
    if (uploadError) {
      return NextResponse.json({ error: "Échec de l'upload." }, { status: 500 });
    }
  }

  const { data: demande, error } = await supabase
    .from("demandes")
    .insert({
      photo_id: finalPhotoId,
      upload_path: uploadPath,
      soiree_id: soireeId,
      description: typeof description === "string" ? description.slice(0, 200) : null,
      message_utilisateur: message.slice(0, 280),
      contact_demandeur:
        typeof contact === "string" && contact ? contact.slice(0, 120) : null,
      ip_hash: ipHash,
    })
    .select("id")
    .single();

  if (error || !demande) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer la demande." },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: demande.id }, { status: 201 });
}
