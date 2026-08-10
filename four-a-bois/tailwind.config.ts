import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "La braise et la farine" — deux matières du four, pas le drapeau italien.
        ash: {
          DEFAULT: "#2A2420", // fond sombre, bois brûlé
          light: "#3A322C",
          dark: "#1D1815",
        },
        flour: {
          DEFAULT: "#F7F1E6", // fond clair, farine
          dark: "#EDE3D0",
        },
        ember: {
          DEFAULT: "#D9531E", // accent unique — pastille ouverte + CTA
          dark: "#B84316",
          light: "#EA7A4A",
        },
        bocage: {
          DEFAULT: "#3F4A34", // badge spécialité normande, jamais décoratif
          light: "#56643F",
        },
        cream: "#F0E9DD", // texte clair sur fond sombre
        char: "#241F1B", // texte sombre sur fond clair
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "999px 999px 12px 12px",
      },
      keyframes: {
        ember: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
      },
      animation: {
        ember: "ember 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
