import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TiktokAuth } from "@/components/TiktokAuth";

// Carousel Studio's TikTok sign-in comes back here, at mellowmigraine.com/
// tiktok-auth (no language prefix: the default locale), with ?code=…&state=…
// or ?error=… in the address. The page only shows that address to copy back
// into Carousel Studio: no server call, nothing stored. Hidden from search
// engines and absent from the sitemap; the address is never sent to other
// sites as a referrer.
const PAGE_LOCALE = "en";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: PAGE_LOCALE }];
}

export const metadata: Metadata = {
  title: "Connexion TikTok · Mellow",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: "no-referrer",
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) notFound();
  setRequestLocale(locale);
  return (
    <>
      <Nav />
      {/* data-hides-qr: no download widget over this page. */}
      <main data-hides-qr className="mx-auto max-w-xl px-6 py-16 text-center md:py-24">
        <TiktokAuth />
      </main>
      <Footer />
    </>
  );
}
