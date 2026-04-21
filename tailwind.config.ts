import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        cloud: "#F5F5F5",
        mellow: {
          pink: "#F8C8CC",
          rose: "#EF4A5B",
          peach: "#F8B68A",
          orange: "#F28B3E",
          sky: "#CFE2F3",
          blue: "#8AB4E8",
        },
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
      boxShadow: {
        soft: "0 10px 40px -15px rgba(0,0,0,0.15)",
        phone: "0 25px 60px -20px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [typography],
};

export default config;
