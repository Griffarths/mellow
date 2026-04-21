import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { MellowsSlider } from "@/components/sections/MellowsSlider";
import { Features } from "@/components/sections/Features";
import { Courses } from "@/components/sections/Courses";
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
        <Courses />
        <Screenshots />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
