import Link from "next/link";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import ModererActions from "@/components/ModererActions";

export const dynamic = "force-dynamic";

export default async function AdminQueuePage() {
  const supabase = await createServerSupabaseClient();

  const { data: demandes } = await supabase
    .from("demandes")
    .select(
      "id, description, message_utilisateur, created_at, upload_path, photos(storage_path), soirees(libelle)"
    )
    .eq("statut", "en_attente")
    .order("created_at", { ascending: true })
    .returns<
      Array<{
        id: string;
        description: string | null;
        message_utilisateur: string;
        created_at: string;
        upload_path: string | null;
        photos: { storage_path: string } | null;
        soirees: { libelle: string } | null;
      }>
    >();

  const storage = createServiceRoleClient().storage.from("crush-photos");
  const demandesAvecUrl = await Promise.all(
    (demandes ?? []).map(async (d) => {
      const storagePath = d.photos?.storage_path ?? d.upload_path;
      const url = storagePath
        ? (await storage.createSignedUrl(storagePath, 600)).data?.signedUrl ?? null
        : null;
      return { ...d, url };
    })
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        File d&apos;attente ({demandesAvecUrl.length})
      </h1>

      {demandesAvecUrl.length === 0 ? (
        <p className="text-white/50">Rien à modérer pour le moment.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {demandesAvecUrl.map((d) => (
            <div key={d.id} className="flex gap-4 rounded-lg border border-white/10 p-4">
              {d.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={d.url} alt="" className="h-32 w-32 rounded-lg object-cover" />
              )}
              <div className="flex-1">
                <p className="text-xs text-white/40">
                  {d.soirees?.libelle} · {new Date(d.created_at).toLocaleString("fr-FR")}
                </p>
                <p className="mt-1 text-sm text-white/70">{d.description}</p>
                <p className="mt-1 font-medium">{d.message_utilisateur}</p>
                <Link
                  href={`/admin/demande/${d.id}`}
                  className="mt-2 inline-block text-xs underline text-white/50"
                >
                  Voir le détail
                </Link>
                <div className="mt-3">
                  <ModererActions demandeId={d.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
