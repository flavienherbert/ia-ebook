import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div>
      <nav className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex gap-4 text-sm">
          <Link href="/admin" className="underline">
            File d&apos;attente
          </Link>
          <Link href="/admin/soirees" className="underline">
            Soirées
          </Link>
          <Link href="/admin/signalements" className="underline">
            Signalements
          </Link>
        </div>
        <SignOutButton />
      </nav>
      {children}
    </div>
  );
}
