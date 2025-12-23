import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        keverd: {
          blue: "#2259AB",
          gold: "#FFD95A",
          ink: "#0A0A0B",
          clay: "#C57024",
          sand: "#F5E6C8",
          dusk: "#1F2937",
        },
      },
      fontFamily: {
        display: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        base: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        "diagonal-fade": {
          "0%": { opacity: "0", transform: "translate3d(-2rem, 2rem, 0) scale(0.98)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0) scale(1)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.03)" },
          "50%": { transform: "scale(0.995)" },
          "70%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "diagonal-fade": "diagonal-fade 0.9s ease-out forwards",
        heartbeat: "heartbeat 1.2s ease-in-out 1",
      },
    },
  },
  plugins: [],
};

export default config;

