import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import ModererActions from "@/components/ModererActions";
import PublierButton from "@/components/PublierButton";

export const dynamic = "force-dynamic";

export default async function AdminDemandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: demande } = await supabase
    .from("demandes")
    .select("*, soirees(libelle)")
    .eq("id", id)
    .maybeSingle();

  if (!demande) notFound();

  const { data: post } = await supabase
    .from("posts_generes")
    .select("*")
    .eq("demande_id", id)
    .maybeSingle();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Demande</h1>
      <p className="mb-6 text-sm text-white/50">
        {demande.soirees?.libelle} · statut : {demande.statut}
      </p>

      <div className="mb-6 rounded-lg border border-white/10 p-4">
        <p className="text-sm text-white/70">{demande.description}</p>
        <p className="mt-1 font-medium">{demande.message_utilisateur}</p>
        {demande.contact_demandeur && (
          <p className="mt-2 text-xs text-white/40">
            Contact (privé) : {demande.contact_demandeur}
          </p>
        )}
        {demande.motif_rejet && (
          <p className="mt-2 text-sm text-red-400">Motif de rejet : {demande.motif_rejet}</p>
        )}
      </div>

      {demande.statut === "en_attente" && <ModererActions demandeId={demande.id} />}

      {post?.image_url_publique && (
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Aperçu du post généré</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image_url_publique}
            alt=""
            className="mb-4 max-h-[600px] rounded-lg border border-white/10"
          />
          {post.publie_le ? (
            <p className="text-sm text-white/50">
              Publié le {new Date(post.publie_le).toLocaleString("fr-FR")}
            </p>
          ) : (
            <PublierButton postId={post.id} />
          )}
        </div>
      )}
    </div>
  );
}
