import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/nav";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Klarim",
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#06060a",
    theme_color: "#2e6bff",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
