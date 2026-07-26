import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prêt. — Le logement est-il prêt ?",
  description:
    "Une seule question, une réponse par logement, en direct. La plateforme pour conciergeries de location courte durée.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} bg-paper font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
