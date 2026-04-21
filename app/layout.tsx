import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mellow — Suivi de migraines",
  description:
    "Mellow t'aide à enregistrer tes crises en quelques secondes, identifier tes déclencheurs et comprendre ce qui te soulage vraiment.",
  openGraph: {
    title: "Mellow — Suivi de migraines",
    description:
      "Enregistre tes crises en un instant. Identifie tes déclencheurs. Analyse ce qui te soulage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
