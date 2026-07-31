import { notFound } from "next/navigation";
import { createPublicClient, createServiceRoleClient } from "@/lib/supabase/server";
import type { Photo } from "@/lib/types";
import DemandeForm from "@/components/DemandeForm";

export default async function DemandePage({
  params,
}: {
  params: Promise<{ photoId: string }>;
}) {
  const { photoId } = await params;
  const supabase = createPublicClient();

  const { data: photo } = await supabase
    .from("photos")
    .select("*, soirees!inner(statut)")
    .eq("id", photoId)
    .eq("soirees.statut", "publiee")
    .maybeSingle<Photo & { soirees: { statut: string } }>();

  if (!photo) notFound();

  const { data: signed } = await createServiceRoleClient()
    .storage.from("crush-photos")
    .createSignedUrl(photo.storage_path, 3600);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Je cherche quelqu&apos;un sur cette photo</h1>

      {signed?.signedUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={signed.signedUrl}
          alt=""
          className="mb-6 max-h-96 w-full rounded-lg object-cover"
        />
      )}

      <DemandeForm photoId={photo.id} soireeId={photo.soiree_id} />
    </div>
  );
}
