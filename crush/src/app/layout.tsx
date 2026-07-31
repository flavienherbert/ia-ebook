import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crush",
  description: "Retrouve la personne que tu as croisée en soirée.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6">
          <header className="mb-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Crush
            </Link>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-white/10 pt-4 text-sm text-white/50">
            <Link href="/signalement" className="underline">
              Signaler une photo / demander un retrait
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
