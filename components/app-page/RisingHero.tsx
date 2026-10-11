"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The header of the /app page: the text, then the phone cut by the bottom of
// the section. When the page scrolls, the phone rises faster than the page,
// so the rest of its screen comes out from behind the cut, and the text fades
// as the phone passes over it. Nothing moves if the visitor asked for less
// motion.
export function RisingHero({ text, phone }: { text: ReactNode; phone: ReactNode }) {
  const textRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const [textEl, windowEl, phoneEl] = [textRef.current, windowRef.current, phoneRef.current];
      if (!textEl || !windowEl || !phoneEl) return;
      const y = Math.max(0, window.scrollY);
      // At most until the bottom of the phone reaches the bottom of the cut.
      const most = Math.max(0, phoneEl.offsetHeight - windowEl.offsetHeight);
      phoneEl.style.transform = `translateY(${-Math.min(most, y * 0.45)}px)`;
      // Gone by the time the phone reaches the button.
      textEl.style.opacity = String(1 - Math.min(1, Math.max(0, (y - 20) / 160)));
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
    <>
      <div ref={textRef} className="mx-auto max-w-3xl px-6 pt-12 text-center md:pt-16">
        {text}
      </div>
      {/* Cut only at the bottom (clip-path), so the phone can rise above
          the window and over the text; wider than the phone, so its side
          buttons show. */}
      <div
        ref={windowRef}
        className="relative z-10 mt-12 h-[330px] [clip-path:inset(-100vh_-100vw_0_-100vw)] md:mt-14 md:h-[420px]"
      >
        <div ref={phoneRef} className="mx-auto w-[270px] will-change-transform md:w-[340px]">
          {phone}
        </div>
      </div>
    </>
  );
}
