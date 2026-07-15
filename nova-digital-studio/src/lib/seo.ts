import type { Metadata } from "next";
import { siteConfig } from "@/data/nav";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
