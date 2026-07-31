import { NextResponse } from "next/server";
import { requireModerateur } from "@/lib/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

const GRAPH_API_VERSION = "v19.0";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireModerateur();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceRoleClient();

  const { data: post } = await supabase
    .from("posts_generes")
    .select("id, demande_id, image_url_publique, publie_le")
    .eq("id", id)
    .maybeSingle();

  if (!post) {
    return NextResponse.json({ error: "Post introuvable." }, { status: 404 });
  }
  if (post.publie_le) {
    return NextResponse.json({ error: "Ce post est déjà publié." }, { status: 409 });
  }
  if (!post.image_url_publique) {
    return NextResponse.json({ error: "Image non disponible." }, { status: 400 });
  }

  const igToken = process.env.IG_ACCESS_TOKEN;
  const igAccountId = process.env.IG_BUSINESS_ACCOUNT_ID;

  // Étape 1 du MVP : pas de credentials Instagram configurés -> publication
  // manuelle. On renvoie simplement l'URL de l'image à télécharger/partager.
  if (!igToken || !igAccountId) {
    return NextResponse.json({
      manuel: true,
      image_url: post.image_url_publique,
    });
  }

  try {
    const { data: demande } = await supabase
      .from("demandes")
      .select("message_utilisateur")
      .eq("id", post.demande_id)
      .maybeSingle();

    const caption = `${demande?.message_utilisateur ?? ""}\n\nSi tu la/le connais, mentionne-la en commentaire 👇`;

    const creationRes = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${igAccountId}/media?` +
        new URLSearchParams({
          image_url: post.image_url_publique,
          caption,
          access_token: igToken,
        })
    );
    const creationBody = await creationRes.json();
    if (!creationRes.ok || !creationBody.id) {
      throw new Error(creationBody?.error?.message ?? "Création du média échouée.");
    }

    const publishRes = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${igAccountId}/media_publish?` +
        new URLSearchParams({
          creation_id: creationBody.id,
          access_token: igToken,
        }),
      { method: "POST" }
    );
    const publishBody = await publishRes.json();
    if (!publishRes.ok || !publishBody.id) {
      throw new Error(publishBody?.error?.message ?? "Publication échouée.");
    }

    const publieLe = new Date().toISOString();
    await supabase
      .from("posts_generes")
      .update({ publie_le: publieLe, instagram_media_id: publishBody.id })
      .eq("id", id);
    await supabase.from("demandes").update({ statut: "publiee" }).eq("id", post.demande_id);

    return NextResponse.json({ manuel: false, instagram_media_id: publishBody.id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Publication Instagram échouée." },
      { status: 502 }
    );
  }
}
