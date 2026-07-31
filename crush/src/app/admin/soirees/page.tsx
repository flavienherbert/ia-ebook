import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Soiree } from "@/lib/types";
import CreerSoireeForm from "@/components/CreerSoireeForm";
import SoireeAdminCard from "@/components/SoireeAdminCard";

export const dynamic = "force-dynamic";

export default async function AdminSoireesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: soirees } = await supabase
    .from("soirees")
    .select("*")
    .order("date_soiree", { ascending: false })
    .returns<Soiree[]>();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Soirées</h1>
      <CreerSoireeForm />

      <div className="flex flex-col gap-3">
        {(soirees ?? []).map((soiree) => (
          <SoireeAdminCard key={soiree.id} soiree={soiree} />
        ))}
      </div>
    </div>
  );
}
