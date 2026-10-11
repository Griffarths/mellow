"use client";

import { useEffect, useRef, type ReactNode } from "react";

// How far the page scrolls while the header stays in place.
const PINNED = 520;

// The header of the /app page: the text, then the phone cut by the bottom of
// the screen. The section stays pinned under the navbar while the page
// scrolls PINNED pixels: the text fades out and the phone rises until it is
// whole, then the page goes on. If the visitor asked for less motion, the
// header is a plain section, nothing pinned and nothing moving.
export function RisingHero({ text, phone }: { text: ReactNode; phone: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = [sectionRef.current, stageRef.current, textRef.current, windowRef.current, phoneRef.current, fadeRef.current];
      if (els.some((el) => !el)) return;
      const [section, stage, textEl, windowEl, phoneEl, fade] = els as HTMLElement[];
      // 0 when the header arrives, 1 when the page is about to go on.
      const done = section.offsetHeight - stage.offsetHeight;
      const p = done > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / done)) : 0;
      // The phone ends whole and centred in the stage (or at its top if the
      // screen is too short for it).
      const end = Math.max(16, (stage.offsetHeight - phoneEl.offsetHeight) / 2);
      const rise = Math.max(0, windowEl.offsetTop - end);
      phoneEl.style.transform = `translateY(${-rise * p}px)`;
      // The text is gone before the phone covers it.
      textEl.style.opacity = String(1 - Math.min(1, p * 2.5));
      textEl.style.transform = `translateY(${-40 * p}px)`;
      // The white fade hides the cut; once the phone is whole, it goes.
      fade.style.opacity = String(1 - p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative motion-reduce:!h-auto"
      style={{ height: `calc(100svh - 4rem + ${PINNED}px)` }}
    >
      {/* The stage stays under the navbar (4rem) while the section scrolls by. */}
      <div
        ref={stageRef}
        className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden motion-reduce:static motion-reduce:h-auto"
      >
        <div ref={textRef} className="mx-auto max-w-3xl px-6 pt-12 text-center md:pt-16">
          {text}
        </div>
        {/* Wider than the phone, so its side buttons show. The phone is
            never taller than the screen (its height is about 2.1 times its
            width), so it ends whole on a short laptop too. */}
        <div ref={windowRef} className="mt-12 md:mt-14 motion-reduce:h-[330px] motion-reduce:overflow-hidden md:motion-reduce:h-[420px]">
          <div
            ref={phoneRef}
            className="mx-auto w-[min(270px,calc((100svh-7rem)/2.1))] will-change-transform md:w-[min(340px,calc((100svh-7rem)/2.1))] motion-reduce:w-[270px] md:motion-reduce:w-[340px]"
          >
            {phone}
          </div>
        </div>
        <div ref={fadeRef} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white" />
      </div>
    </section>
  );
}
