import { ImageResponse } from "next/og";
import { createServiceRoleClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ demandeId: string }> }
) {
  const { demandeId } = await params;
  const supabase = createServiceRoleClient();

  const { data: demande, error } = await supabase
    .from("demandes")
    .select(
      "id, description, message_utilisateur, upload_path, photos(storage_path), soirees(libelle, boites(nom))"
    )
    .eq("id", demandeId)
    .maybeSingle<{
      id: string;
      description: string | null;
      message_utilisateur: string;
      upload_path: string | null;
      photos: { storage_path: string } | null;
      soirees: { libelle: string; boites: { nom: string } | null } | null;
    }>();

  if (error || !demande) {
    return new Response("Demande introuvable", { status: 404 });
  }

  const storagePath = demande.photos?.storage_path ?? demande.upload_path;
  let photoUrl: string | null = null;
  if (storagePath) {
    const { data: signed } = await supabase.storage
      .from("crush-photos")
      .createSignedUrl(storagePath, 120);
    photoUrl = signed?.signedUrl ?? null;
  }

  const nomBoite = demande.soirees?.boites?.nom ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1350px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(160deg, #1a0f2e 0%, #3d1440 55%, #ff3d81 130%)",
          padding: "56px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Crush</span>
          {nomBoite && (
            <span style={{ fontSize: 28, opacity: 0.8 }}>{nomBoite}</span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            marginTop: 32,
            borderRadius: 32,
            overflow: "hidden",
            background: "rgba(0,0,0,0.25)",
          }}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt=""
              width={1080 - 112}
              height={760}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <div style={{ display: "flex", width: "100%", height: "100%" }} />
          )}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            background: "white",
            color: "#1a0f2e",
            borderRadius: 24,
            padding: "28px 32px",
            fontSize: 32,
            lineHeight: 1.35,
          }}
        >
          {demande.message_utilisateur}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            fontWeight: 600,
            justifyContent: "center",
          }}
        >
          Si tu la/le connais, mentionne-la en commentaire 👇
        </div>
      </div>
    ),
    { width: 1080, height: 1350 }
  );
}
