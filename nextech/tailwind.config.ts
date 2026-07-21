import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#F5F1EA",
        muted: "#9A958C",
        gold: "#C8A15A",
        hairline: "rgba(245,241,234,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.4rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section-h2": ["clamp(1.5rem, 3.2vw, 2.25rem)", { lineHeight: "1.2" }],
        "book-h3": ["clamp(1.05rem, 1.8vw, 1.35rem)", { lineHeight: "1.3" }],
        "stat-num": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.1" }],
        label: ["0.72rem", { letterSpacing: "0.24em" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
