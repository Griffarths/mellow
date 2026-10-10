import type { Metadata } from "next";
import { pageAlternates } from "@/lib/hreflang";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { WhyMellow } from "@/components/sections/WhyMellow";
import { MellowsSlider } from "@/components/sections/MellowsSlider";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/Footer";

// Only the hreflang tags: title and description come from the layout.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav overHero />
      <main>
        <Hero />
        <Features />
        <WhyMellow />
        <MellowsSlider />
        <SocialProof />
        <LatestArticles />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
