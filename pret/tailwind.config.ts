import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "860px",
      lg: "1120px",
      xl: "1320px",
    },
    extend: {
      colors: {
        ink: "#1C2321",
        "ink-soft": "#5B6360",
        paper: "#FAF9F6",
        "paper-alt": "#F0EEE8",
        line: "#DAD7CE",
        green: "#2F6F4E",
        "green-bg": "#E4EEE7",
        amber: "#B7791F",
        "amber-bg": "#F4EBDA",
        red: "#B3423B",
        "red-bg": "#F3E1DE",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
