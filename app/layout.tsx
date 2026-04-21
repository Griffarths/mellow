import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="fr">
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
