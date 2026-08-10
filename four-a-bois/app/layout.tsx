import type { Metadata } from "next";
import { Bricolage_Grotesque, Work_Sans } from "next/font/google";
import "./globals.css";
import { buildRestaurantJsonLd } from "@/lib/jsonld";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lefourabois-vire.fr"),
  title: "Le Four à Bois — Pizzeria au feu de bois à Vire-Normandie",
  description:
    "Pizzas, pâtes et burgers cuits au feu de bois à Vire-Normandie (Calvados). Tout est fait maison. Réservation et vente à emporter au 02 31 68 99 77.",
  keywords: [
    "pizzeria Vire",
    "restaurant italien Vire-Normandie",
    "pizza à emporter Vire",
    "four à bois Vire",
  ],
  openGraph: {
    title: "Le Four à Bois — Pizzeria au feu de bois à Vire-Normandie",
    description:
      "Pizzas, pâtes et burgers cuits au feu de bois. Tout est fait maison, à Vire-Normandie.",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildRestaurantJsonLd();

  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
