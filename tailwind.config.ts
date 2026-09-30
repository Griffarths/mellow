import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      // Values mirror the iOS app (hex literals in the SwiftUI views).
      colors: {
        ink: {
          DEFAULT: "#000000",
          body: "#3A3A3A",
          2: "#666666",
          3: "#767676",
          4: "#999999",
          mute: "#CCCCCC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F4F4F4",
          grouped: "#F2F2F7",
          line: "#EDEDED",
        },
        hero: { DEFAULT: "#FFEEF3", alert: "#FFDDE2" },
        fleur: {
          DEFAULT: "#F4C1D8",
          tint: "rgb(244 193 216 / 0.40)",
          accent: "#E986B3",
        },
        tagada: {
          DEFAULT: "#BFD4EE",
          tint: "rgb(191 212 238 / 0.45)",
          accent: "#6F9BD1",
        },
        croix: {
          DEFAULT: "#F1A6B1",
          tint: "rgb(241 166 177 / 0.28)",
          accent: "#D9707F",
          ink: "#B8505F",
        },
        sable: {
          DEFAULT: "#F0CCA2",
          tint: "rgb(240 204 162 / 0.35)",
          accent: "#C9955C",
        },
        brand: { DEFAULT: "#ED97BE", hot: "#FF479A", "hot-soft": "#FFE4F0" },
        danger: "#E5484D",
        success: "#5FA35C",
      },
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        caption: ["12px", { lineHeight: "1.4" }],
        display: [
          "clamp(40px, 5vw, 64px)",
          { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "800" },
        ],
        h1: [
          "clamp(34px, 4.4vw, 52px)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        h2: [
          "clamp(28px, 3.6vw, 44px)",
          { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" },
        ],
        h3: [
          "clamp(20px, 2.2vw, 24px)",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
      },
      borderRadius: {
        chip: "14px",
        btn: "16px",
        card: "24px",
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgb(0 0 0 / 0.10)",
      },
    },
  },
  plugins: [typography],
};

export default config;
