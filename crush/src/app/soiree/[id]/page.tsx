import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createPublicClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { Photo, Soiree } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SoireePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createPublicClient();

  const { data: soiree } = await supabase
    .from("soirees")
    .select("*")
    .eq("id", id)
    .eq("statut", "publiee")
    .maybeSingle<Soiree>();

  if (!soiree) notFound();

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("soiree_id", id)
    .order("ordre", { ascending: true })
    .returns<Photo[]>();

  // Le bucket `crush-photos` est privé : les URLs signées sont générées
  // côté serveur avec la clé service_role, jamais exposée au client.
  const storage = createServiceRoleClient().storage.from("crush-photos");
  const photosAvecUrl = await Promise.all(
    (photos ?? []).map(async (photo) => {
      const { data } = await storage.createSignedUrl(photo.storage_path, 3600);
      return { ...photo, url: data?.signedUrl ?? null };
    })
  );

  return (
    <div>
      <Link href="/" className="mb-4 inline-block text-sm text-white/50 underline">
        ← Toutes les soirées
      </Link>
      <h1 className="mb-1 text-2xl font-bold">{soiree.libelle}</h1>
      <p className="mb-6 text-white/60">
        Clique sur la photo où tu te trouves (ou où se trouve la personne que
        tu cherches).
      </p>

      {photosAvecUrl.length === 0 ? (
        <p className="text-white/50">Aucune photo pour cette soirée.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photosAvecUrl.map((photo) =>
            photo.url ? (
              <Link
                key={photo.id}
                href={`/demande/${photo.id}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10"
              >
                <Image
                  src={photo.url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition group-hover:scale-105"
                  unoptimized
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-center text-xs">
                  Je cherche quelqu&apos;un ici
                </span>
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
