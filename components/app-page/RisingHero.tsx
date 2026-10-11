"use client";

import { useEffect, useRef, type ReactNode } from "react";

// How far the page scrolls while the header stays in place.
const PINNED = 520;

// What the callouts point at on the home screen, in % of the phone (frame
// included): the Mellow, the migraine-free days, the hugs, the shortcuts.
// Left or right of the phone, and when each one appears in the rise (0 to 1).
const TARGETS = [
  { side: "left", x: 30, y: 27, from: 0.5 },
  { side: "right", x: 84, y: 43, from: 0.6 },
  { side: "left", x: 11, y: 52, from: 0.7 },
  { side: "right", x: 78, y: 72, from: 0.8 },
] as const;

// The header of the /app page: the text, then the phone cut by the bottom of
// the screen. The section stays pinned under the navbar while the page
// scrolls PINNED pixels: the text fades out and the phone rises until it is
// whole, then the page goes on. If the visitor asked for less motion, the
// header is a plain section, nothing pinned and nothing moving.
export function RisingHero({
  text,
  phone,
  callouts,
}: {
  text: ReactNode;
  phone: ReactNode;
  callouts: Array<{ title: string; text: string }>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);

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
      // The callouts come one by one at the end of the rise.
      calloutRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(Math.min(1, Math.max(0, (p - TARGETS[i].from) / 0.15)));
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
            never taller than the screen (its height is about 2.1 times its
            width), so it ends whole on a short laptop too. */}
        <div ref={windowRef} className="mt-12 md:mt-14 motion-reduce:h-[330px] motion-reduce:overflow-hidden md:motion-reduce:h-[420px]">
          <div
            ref={phoneRef}
            className="mx-auto w-[min(270px,calc((100svh-7rem)/2.1))] will-change-transform md:w-[min(340px,calc((100svh-7rem)/2.1))] motion-reduce:w-[270px] md:motion-reduce:w-[340px]"
          >
            <div className="relative">
              {phone}
              {/* From a laptop up: each callout on the side of the phone, a
                  thin line running to what it points at. */}
              {callouts.map((callout, i) => {
                const t = TARGETS[i];
                const left = t.side === "left";
                return (
                  <div
                    key={callout.title}
                    ref={(el) => {
                      calloutRefs.current[i] = el;
                    }}
                    aria-hidden
                    className={`absolute hidden -translate-y-1/2 items-center opacity-0 lg:flex motion-reduce:!hidden ${left ? "" : "flex-row-reverse"}`}
                    style={left ? { top: `${t.y}%`, left: -290, right: `${100 - t.x}%` } : { top: `${t.y}%`, left: `${t.x}%`, right: -290 }}
                  >
                    <div className={`w-[230px] shrink-0 ${left ? "pr-4 text-right" : "pl-4"}`}>
                      <p className="text-[15px] font-bold text-ink">{callout.title}</p>
                      <p className="mt-0.5 text-sm leading-snug text-ink-3">{callout.text}</p>
                    </div>
                    <span className="h-px flex-1 bg-ink/25" />
                    <span className="h-2 w-2 shrink-0 rounded-full bg-croix-ink ring-2 ring-white" />
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
