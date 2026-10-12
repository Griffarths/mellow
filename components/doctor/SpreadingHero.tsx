"use client";

import { useEffect, useRef, type ReactNode } from "react";

// How far the page scrolls while the header stays in place, as on the /app
// page.
const PINNED = 420;

// How far each side sheet travels, in the 760px-wide fan: from behind the
// front sheet (left 255px), peeking out by PEEK pixels so the pile shows, to
// its place on the side (10px from the edge).
const SHIFT = 245;
const PEEK = 16;

// The animation runs from a tablet up (on a phone the sheets are a row to
// swipe) and only if the visitor did not ask for less motion.
const ACTIVE = "(min-width: 640px) and (prefers-reduced-motion: no-preference)";

// The header of the "For your doctor" page, like the phone of the /app page:
// the text, then the three reports stacked, cut by the bottom of the screen.
// The section stays pinned under the navbar while the page scrolls PINNED
// pixels: the text fades out, the reports rise until they are whole and the
// history and MIDAS slide out to the sides, then the page goes on. Once
// spread, the fan opens a little more on hover, as on the /app page. On a
// phone, or with less motion, it is a plain section, the fan already spread.
export function SpreadingHero({
  text,
  carousel,
  left,
  front,
  right,
}: {
  text: ReactNode;
  carousel: ReactNode;
  left: ReactNode;
  front: ReactNode;
  right: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [sectionRef.current, stageRef.current, textRef.current, fanRef.current, leftRef.current, rightRef.current, fadeRef.current];
    if (els.some((el) => !el)) return;
    const [section, stage, textEl, fan, leftEl, rightEl, fade] = els as HTMLElement[];
    const media = window.matchMedia(ACTIVE);

    // The sizes are measured once (and again on resize): on each frame only
    // the scroll is read, as on the /app page.
    let start = 0;
    let done = 1;
    let rise = 0;
    const measure = () => {
      start = section.getBoundingClientRect().top + window.scrollY - 64;
      done = Math.max(1, section.offsetHeight - stage.offsetHeight);
      // The fan ends whole and centred in the stage (or at its top if the
      // screen is too short for it).
      const end = Math.max(16, (stage.offsetHeight - fan.offsetHeight) / 2);
      rise = Math.max(0, fan.offsetTop - end);
    };

    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      // 0 when the header pins, 1 when the page is about to go on.
      const p = Math.round(Math.min(1, Math.max(0, (window.scrollY - start) / done)) * 1000) / 1000;
      if (p === last) return;
      last = p;
      // The sheets spread once the fan is well on its way up, easing in and
      // out, and the fan grows a little as it opens.
      const t = Math.min(1, Math.max(0, (p - 0.25) / 0.75));
      const s = t * t * (3 - 2 * t);
      fan.style.transform = `translate3d(0, ${-rise * p}px, 0) scale(${1 + 0.1 * s})`;
      // The text is gone before the reports cover it.
      textEl.style.opacity = String(1 - Math.min(1, p * 3));
      textEl.style.transform = `translate3d(0, ${-40 * p}px, 0)`;
      fade.style.opacity = String(1 - p);
      const x = (SHIFT - PEEK) * (1 - s);
      leftEl.style.transform = `translate3d(${x}px, ${-6 * (1 - s)}px, 0) rotate(${-4 - 3 * s}deg)`;
      rightEl.style.transform = `translate3d(${-x}px, ${-6 * (1 - s)}px, 0) rotate(${4 + 3 * s}deg)`;
    };
    // Back to the plain section: the styles of the stylesheet apply again.
    const reset = () => {
      for (const el of [fan, textEl, fade, leftEl, rightEl]) {
        el.style.transform = "";
        el.style.opacity = "";
      }
      last = -1;
    };
    const onScroll = () => {
      if (media.matches && !frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      if (!media.matches) return reset();
      measure();
      last = -1;
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      media.removeEventListener("change", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative sm:motion-safe:h-[calc(100svh-4rem+420px)]">
      {/* The stage stays under the navbar (4rem) while the section scrolls by. */}
      <div
        ref={stageRef}
        className="motion-reduce:pb-12 sm:motion-safe:sticky sm:motion-safe:top-16 sm:motion-safe:h-[calc(100svh-4rem)] sm:motion-safe:overflow-hidden"
      >
        <div ref={textRef} className="mx-auto max-w-3xl px-6 pt-12 text-center will-change-[opacity,transform] md:pt-16">
          {text}
        </div>

        <div className="mt-12 px-6 pb-8 sm:hidden">{carousel}</div>

        {/* From a tablet up, the fan, scaled to the width. Before the
            animation takes over (and on the server), the side sheets wait
            stacked behind the front one, so nothing jumps on load. */}
        <div
          ref={fanRef}
          aria-hidden
          className="relative mx-auto mt-12 hidden h-[320px] max-w-[760px] will-change-transform sm:block md:mt-16 md:h-[380px] lg:h-[440px]"
        >
          <div className="group absolute left-1/2 top-0 h-[420px] w-[760px] origin-top -translate-x-1/2 scale-[0.72] md:scale-[0.85] lg:scale-100">
            {/* The history, on the left. */}
            <div
              ref={leftRef}
              className="absolute left-[10px] top-[24px] -rotate-[7deg] will-change-transform sm:motion-safe:[transform:translate3d(229px,-6px,0)_rotate(-4deg)]"
            >
              <div className="transition-transform duration-500 ease-out group-hover:-translate-x-6 group-hover:-rotate-3 motion-reduce:transition-none">
                {left}
              </div>
            </div>
            {/* MIDAS, on the right. */}
            <div
              ref={rightRef}
              className="absolute right-[10px] top-[24px] rotate-[7deg] will-change-transform sm:motion-safe:[transform:translate3d(-229px,-6px,0)_rotate(4deg)]"
            >
              <div className="transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:rotate-3 motion-reduce:transition-none">
                {right}
              </div>
            </div>
            {/* The analysis, in front, a little bigger. */}
            <div className="absolute left-[255px] top-[18px] z-10 scale-[1.08] transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none">
              {front}
            </div>
          </div>
        </div>

        {/* The white fade hides the cut; once the fan is whole, it goes. */}
        <div
          ref={fadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-white will-change-[opacity] sm:motion-safe:block"
        />
      </div>
    </section>
  );
}
