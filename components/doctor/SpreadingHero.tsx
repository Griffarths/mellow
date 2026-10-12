"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Where each side sheet sits, in the 760px-wide fan, as its distance from
// the front sheet (left 255px) and its tilt. At the start, the pile: the two
// sheets behind the front one, peeking out a little. At the end on a
// computer, the fan: each sheet on its side, 10px from the edge. On a phone
// the fan does not fit: the sheets open only a little, like a hand of cards.
const PILE = { x: 222, tilt: 5 };
const FAN = { x: 0, tilt: 7 };
const HAND = { x: 195, tilt: 9 };

const PHONE = "(max-width: 639px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

// The header of the "For your doctor" page, like the phone of the /app page:
// the text, then the three reports stacked, cut by the bottom of the screen.
// The section stays pinned under the navbar while the page scrolls 420px
// (as on the /app page): the text fades out, the reports rise until they are whole and the
// history and MIDAS slide out to the sides, then the page goes on. Nothing
// moves on hover. If the visitor asked for less motion, it is a plain
// section, the reports already open.
export function SpreadingHero({
  text,
  left,
  front,
  right,
}: {
  text: ReactNode;
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
    const phone = window.matchMedia(PHONE);
    const reduced = window.matchMedia(REDUCED);

    // The sizes are measured once (and again on resize): on each frame only
    // the scroll is read, as on the /app page.
    let start = 0;
    let done = 1;
    let rise = 0;
    let end = FAN;
    const measure = () => {
      start = section.getBoundingClientRect().top + window.scrollY - 64;
      done = Math.max(1, section.offsetHeight - stage.offsetHeight);
      // The reports end whole and centred in the stage (or at its top if the
      // screen is too short for them).
      const top = Math.max(16, (stage.offsetHeight - fan.offsetHeight) / 2);
      rise = Math.max(0, fan.offsetTop - top);
      end = phone.matches ? HAND : FAN;
    };

    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      // 0 when the header pins, 1 when the page is about to go on.
      const p = Math.round(Math.min(1, Math.max(0, (window.scrollY - start) / done)) * 1000) / 1000;
      if (p === last) return;
      last = p;
      fan.style.transform = `translate3d(0, ${-rise * p}px, 0)`;
      // The text is gone before the reports cover it.
      textEl.style.opacity = String(1 - Math.min(1, p * 3));
      textEl.style.transform = `translate3d(0, ${-40 * p}px, 0)`;
      // The white fade hides the cut; once the reports are whole, it goes.
      fade.style.opacity = String(1 - p);
      // The sheets open once the reports are well on their way up, easing
      // in and out.
      const t = Math.min(1, Math.max(0, (p - 0.25) / 0.75));
      const s = t * t * (3 - 2 * t);
      const x = PILE.x + (end.x - PILE.x) * s;
      const tilt = PILE.tilt + (end.tilt - PILE.tilt) * s;
      const y = -5 * (1 - s);
      leftEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${-tilt}deg)`;
      rightEl.style.transform = `translate3d(${-x}px, ${y}px, 0) rotate(${tilt}deg)`;
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
      if (!reduced.matches && !frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      if (reduced.matches) return reset();
      measure();
      last = -1;
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    phone.addEventListener("change", onResize);
    reduced.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      phone.removeEventListener("change", onResize);
      reduced.removeEventListener("change", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative motion-safe:h-[calc(100svh-4rem+420px)]">
      {/* The stage stays under the navbar (4rem) while the section scrolls by. */}
      <div
        ref={stageRef}
        className="motion-reduce:pb-12 motion-safe:sticky motion-safe:top-16 motion-safe:h-[calc(100svh-4rem)] motion-safe:overflow-hidden"
      >
        <div ref={textRef} className="mx-auto max-w-3xl px-6 pt-12 text-center will-change-[opacity,transform] md:pt-16">
          {text}
        </div>

        {/* The fan, scaled to the width: larger on a computer than on the
            /app page, the reports being the subject here. Before the
            animation takes over (and on the server), the side sheets wait in
            the pile, so nothing jumps on load. With less motion they are
            open: the fan, or on a phone the hand of cards. */}
        <div
          ref={fanRef}
          aria-hidden
          className="relative mx-auto mt-12 h-[370px] will-change-transform sm:h-[320px] md:mt-16 md:h-[380px] lg:h-[470px] xl:h-[550px]"
        >
          <div className="absolute left-1/2 top-0 h-[420px] w-[760px] origin-top -translate-x-1/2 scale-[0.88] sm:scale-[0.72] md:scale-[0.9] lg:scale-[1.1] xl:scale-[1.3]">
            {/* The history, on the left. */}
            <div
              ref={leftRef}
              className="absolute left-[10px] top-[24px] -rotate-[7deg] will-change-transform max-sm:motion-reduce:[transform:translate3d(195px,0,0)_rotate(-9deg)] motion-safe:[transform:translate3d(222px,-5px,0)_rotate(-5deg)]"
            >
              {left}
            </div>
            {/* MIDAS, on the right. */}
            <div
              ref={rightRef}
              className="absolute right-[10px] top-[24px] rotate-[7deg] will-change-transform max-sm:motion-reduce:[transform:translate3d(-195px,0,0)_rotate(9deg)] motion-safe:[transform:translate3d(-222px,-5px,0)_rotate(5deg)]"
            >
              {right}
            </div>
            {/* The analysis, in front, a little bigger. */}
            <div className="absolute left-[255px] top-[18px] z-10 scale-[1.08]">{front}</div>
          </div>
        </div>

        {/* The white fade hides the cut; once the reports are whole, it goes. */}
        <div
          ref={fadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-white will-change-[opacity] motion-safe:block"
        />
      </div>
    </section>
  );
}
