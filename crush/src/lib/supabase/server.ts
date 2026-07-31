import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

/**
 * Client "session utilisateur" — utilisé dans les pages/routes du
 * back-office pour savoir qui est connecté (RLS "authenticated" appliquée).
 * Ne jamais utiliser pour les écritures publiques (formulaire de demande).
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // appelé depuis un composant serveur sans possibilité d'écrire
            // les cookies : le middleware/route handler s'en charge ailleurs.
          }
        },
      },
    }
  );
}

/**
 * Client "service_role" — contourne RLS. Réservé aux routes serveur
 * (API route handlers) : c'est le seul chemin par lequel le formulaire
 * public peut écrire dans `demandes`, jamais depuis le navigateur.
 */
export function createServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

/**
 * Client anonyme côté serveur, pour les pages publiques (accueil, galerie).
 * Respecte les policies RLS de lecture publique — pas d'accès élargi.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
