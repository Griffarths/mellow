import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { MellowsSlider } from "@/components/sections/MellowsSlider";
import { Features } from "@/components/sections/Features";
import { Screenshots } from "@/components/sections/Screenshots";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MellowsSlider />
        <Features />
        <Screenshots />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
