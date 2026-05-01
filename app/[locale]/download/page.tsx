import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://mellowmigraine.com";
const PAGE_URL = `${SITE_URL}/download`;

type Props = { params: Promise<{ locale: string }> };

// Same FR content served on every locale — this page is a deep-link
// target opened from the iOS app (in-app browser → "open in Safari").
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Télécharger Mellow",
  description: "Pour télécharger Mellow, ouvre cette page dans Safari.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Télécharger Mellow",
    description: "Pour télécharger Mellow, ouvre cette page dans Safari.",
    url: PAGE_URL,
    type: "website",
  },
};

const STEPS = [
  {
    n: 1,
    text: "Appuie sur ⋯ (en haut à droite)",
    bg: "bg-[#FFE5E5]",
  },
  {
    n: 2,
    text: "Choisis « Ouvrir dans Safari »",
    bg: "bg-[#FADFCC]",
  },
  {
    n: 3,
    text: "Télécharge Mellow sur l'App Store",
    bg: "bg-[#DFE8F5]",
  },
];

export default async function DownloadPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col bg-white text-ink">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-24">
        <img
          src="/blobs/Fleur1.svg"
          alt=""
          aria-hidden
          draggable={false}
          className="h-32 w-32 select-none md:h-40 md:w-40"
        />

        <h1 className="hero-title mt-10 text-4xl font-bold tracking-tight md:text-6xl">
          Une dernière étape ☁️
        </h1>
        <p className="mt-5 max-w-md text-lg text-black/60 md:text-xl">
          Pour télécharger Mellow, ouvre cette page dans Safari
        </p>

        <ol className="mt-14 grid w-full max-w-4xl gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className={`flex flex-col gap-4 rounded-[32px] p-6 text-left md:rounded-[40px] md:p-8 ${step.bg}`}
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-base font-bold text-ink md:h-12 md:w-12 md:text-lg">
                {step.n}
              </div>
              <p className="text-lg font-semibold leading-snug tracking-tight text-ink md:text-xl">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-black/5 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 text-sm text-black/50">
          <img
            src="/blobs/Fleur1.svg"
            alt=""
            aria-hidden
            draggable={false}
            className="h-7 w-7 select-none"
          />
          <span className="font-semibold text-black/80">Mellow</span>
        </div>
      </footer>
    </main>
  );
}
