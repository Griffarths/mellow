import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { MellowsSlider } from "@/components/sections/MellowsSlider";
import { Courses } from "@/components/sections/Courses";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { Screenshots } from "@/components/sections/Screenshots";
import { SocialProof } from "@/components/sections/SocialProof";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <SocialProof />
        <MellowsSlider />
        <Courses />
        <LatestArticles />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
