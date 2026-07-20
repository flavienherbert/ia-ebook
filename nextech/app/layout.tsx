import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/config";
import Grain from "@/components/Grain";
import CinematicBackground from "@/components/CinematicBackground";
import SmoothScroll from "@/components/providers/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-background font-sans antialiased">
        <CinematicBackground />
        <div className="relative z-10">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
        <Grain />
      </body>
    </html>
  );
}
