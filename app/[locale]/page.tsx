import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { MellowsSlider } from "@/components/sections/MellowsSlider";
import { Features } from "@/components/sections/Features";
import { Courses } from "@/components/sections/Courses";
import { Screenshots } from "@/components/sections/Screenshots";
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
        <MellowsSlider />
        <Features />
        <Courses />
        <Screenshots />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
