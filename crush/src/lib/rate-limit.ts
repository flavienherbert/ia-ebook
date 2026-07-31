import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_DEMANDES_PAR_JOUR = 3;

/**
 * Hache l'IP avec un sel serveur : on ne stocke jamais l'IP en clair,
 * seulement de quoi détecter le spam (limite par IP / 24h).
 */
export function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT ?? "crush-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

/**
 * Retourne true si l'IP a déjà atteint la limite de demandes sur 24h.
 */
export async function estLimitePassee(
  supabase: SupabaseClient,
  ipHash: string
): Promise<boolean> {
  const depuis = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from("demandes")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", depuis);

  if (error) {
    // en cas d'erreur de comptage, on n'ouvre pas la porte au spam :
    // on considère la limite comme atteinte et on laisse le modérateur
    // constater l'anomalie plutôt que de risquer un flot de demandes.
    return true;
  }

  return (count ?? 0) >= MAX_DEMANDES_PAR_JOUR;
}
