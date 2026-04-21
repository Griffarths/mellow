"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Blob } from "../phones/Blob";

type Mellow = {
  name: string;
  blob: "Fleur1" | "Tagada1" | "Croix1";
  tagline: string;
  description: string;
  bg: string;
  accent: string;
};

const MELLOWS: Mellow[] = [
  {
    name: "Mellow Rose",
    blob: "Fleur1",
    tagline: "Le veilleur des jours tranquilles",
    description:
      "Il veille sur toi quand la douleur se fait discrète. Ces moments plus légers méritent aussi d'être accompagnés.",
    bg: "bg-[#FDECEF]",
    accent: "text-[#E27A8E]",
  },
  {
    name: "Mellow Bleu",
    blob: "Tagada1",
    tagline: "L'épaule des jours plus lourds",
    description:
      "Il t'accompagne avec douceur quand la douleur s'installe. Tu n'as pas à traverser ça seul.",
    bg: "bg-[#E6EEFB]",
    accent: "text-[#5F86C0]",
  },
  {
    name: "Mellow Rouge",
    blob: "Croix1",
    tagline: "Le compagnon des crises",
    description:
      "Il reste à tes côtés quand la douleur est au plus fort. Même dans les moments les plus difficiles, il est là.",
    bg: "bg-[#FBE2E6]",
    accent: "text-[#C84D61]",
  },
];

export function MellowsSlider() {
  const [index, setIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slideWidth = el.clientWidth;
    el.scrollTo({ left: slideWidth * i, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const slideWidth = el.clientWidth;
      if (slideWidth === 0) return;
      const i = Math.round(el.scrollLeft / slideWidth);
      setIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            Rencontre les Mellows.
          </h2>
          <p className="mt-4 text-lg text-black/60 md:text-xl">
            Chaque Mellow t&apos;accompagne à un moment différent.
          </p>
        </div>

        <div className="mt-12">
          <div
            ref={scrollerRef}
            className="-mx-6 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MELLOWS.map((m) => (
              <div key={m.name} className="w-full shrink-0 snap-center pr-4">
                <MellowCard mellow={m} />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {MELLOWS.map((m, i) => (
              <button
                key={m.name}
                type="button"
                aria-label={`Voir ${m.name}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-ink" : "w-2 bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MellowCard({ mellow }: { mellow: Mellow }) {
  return (
    <div
      className={`relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[36px] px-8 py-14 text-center md:min-h-[520px] md:py-20 ${mellow.bg}`}
    >
      <Blob
        name={mellow.blob}
        className="h-44 w-44 md:h-60 md:w-60"
        alt={mellow.name}
      />
      <p
        className={`mt-8 text-xs font-semibold uppercase tracking-[0.2em] ${mellow.accent}`}
      >
        {mellow.name}
      </p>
      <h3 className="mt-3 max-w-md text-2xl font-bold leading-tight tracking-tight md:text-3xl">
        {mellow.tagline}
      </h3>
      <p className="mt-4 max-w-lg text-base text-black/60 md:text-lg">
        {mellow.description}
      </p>
    </div>
  );
}
