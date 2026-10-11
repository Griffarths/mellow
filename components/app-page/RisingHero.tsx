"use client";

import { useEffect, useRef, type ReactNode } from "react";

// How far the page scrolls while the header stays in place.
const PINNED = 520;

// Where the four promises sit around the phone: left or right, the height of
// their middle in % of the phone, and when each one appears in the rise (0 to
// 1), reading from one side to the other, top to bottom.
const SPOTS = [
  { side: "left", y: 22, from: 0.5 },
  { side: "right", y: 38, from: 0.6 },
  { side: "left", y: 58, from: 0.7 },
  { side: "right", y: 74, from: 0.8 },
] as const;

// The header of the /app page: the text, then the phone cut by the bottom of
// the screen. The section stays pinned under the navbar while the page
// scrolls PINNED pixels: the text fades out and the phone rises until it is
// whole, then the page goes on. If the visitor asked for less motion, the
// header is a plain section, nothing pinned and nothing moving. From a laptop
// up, four promises then appear one by one on the sides of the phone.
export function RisingHero({
  text,
  phone,
  promises,
}: {
  text: ReactNode;
  phone: ReactNode;
  promises: Array<{ title: string; text: string }>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const promiseRefs = useRef<Array<HTMLDivElement | null>>([]);

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
      // The promises come one by one at the end of the rise.
      promiseRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(Math.min(1, Math.max(0, (p - SPOTS[i].from) / 0.15)));
      });
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
            never taller than the screen less 10rem (its height is about 2.1
            times its width): it ends whole on a short laptop too, with room
            below for its shadow, which the stage would cut. */}
        <div ref={windowRef} className="mt-12 md:mt-14 motion-reduce:h-[330px] motion-reduce:overflow-hidden md:motion-reduce:h-[420px]">
          <div
            ref={phoneRef}
            className="mx-auto w-[min(270px,calc((100svh-10rem)/2.1))] will-change-transform md:w-[min(340px,calc((100svh-10rem)/2.1))] motion-reduce:w-[270px] md:motion-reduce:w-[340px]"
          >
            <div className="relative">
              {phone}
              {/* From a laptop up, on the sides of the phone. */}
              {promises.map((promise, i) => {
                const spot = SPOTS[i];
                const left = spot.side === "left";
                return (
                  <div
                    key={promise.title}
                    ref={(el) => {
                      promiseRefs.current[i] = el;
                    }}
                    className={`absolute hidden w-[270px] -translate-y-1/2 opacity-0 lg:block motion-reduce:!hidden ${
                      left ? "right-[calc(100%+3.5rem)] text-right" : "left-[calc(100%+3.5rem)]"
                    }`}
                    style={{ top: `${spot.y}%` }}
                  >
                    {/* Non-breaking hyphens: "rendez-vous" stays on one line. */}
                    <p className="text-balance text-xl font-bold leading-snug text-ink">
                      {promise.title.replace(/(\p{L})-(\p{L})/gu, "$1\u2011$2")}
                    </p>
                    <p className="mt-1.5 text-base leading-snug text-ink-3">{promise.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div ref={fadeRef} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white" />
      </div>
    </section>
  );
}
