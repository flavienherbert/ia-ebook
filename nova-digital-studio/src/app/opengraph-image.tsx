import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/nav";

export const alt = "Klarim — Agence digitale premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#06060a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(77,139,255,0.35), transparent 55%), radial-gradient(circle at 85% 80%, rgba(154,99,255,0.3), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2e6bff, #7c3aed)",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <span style={{ color: "white", fontSize: 32, fontWeight: 600 }}>
            {siteConfig.name}
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 60, fontWeight: 700, color: "white", maxWidth: 900, lineHeight: 1.15 }}>
          De la clarté stratégique à des résultats mesurables.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#b6bbcf" }}>
          Sites web · E-commerce · SEO · Publicité · Branding · Automatisation & IA
        </div>
      </div>
    ),
    { ...size }
  );
}
