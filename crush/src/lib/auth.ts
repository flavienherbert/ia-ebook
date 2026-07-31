import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Vérifie qu'une requête de back-office est bien authentifiée. Retourne
 * l'utilisateur Supabase ou `null` — à appeler en tête de chaque route
 * `/api/admin/*` et `/api/demandes/[id]/moderer`.
 */
export async function requireModerateur() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
