"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Labels = {
  question: string;
  mild: string;
  moderate: string;
  intense: string;
  hint: string;
  // "1 to 3", "4 to 6", "7 to 10".
  ranges: [string, string, string];
};

// As in the app (CalendrierView): 1 to 3 is the pink Mellow, 4 to 6 the blue
// one, 7 to 10 the red one, each with its colour. `pick` is the value set
// when the Mellow is tapped.
const LEVELS = [
  { key: "mild", blob: "Fleur1", color: "#F4C1D8", pick: 2 },
  { key: "moderate", blob: "Tagada2", color: "#BFD4EE", pick: 5 },
  { key: "intense", blob: "Croix2", color: "#F1A6B1", pick: 8 },
] as const;

const levelOf = (n: number) => (n <= 3 ? 0 : n <= 6 ? 1 : 2);

// The three Mellows of the intensity scale and a slider from 1 to 10: the
// Mellow of the chosen level grows, the others fade. Once in view the value
// climbs alone from 1 to 8, unless the visitor asked for less motion.
export function IntensityDemo({ labels }: { labels: Labels }) {
  const [value, setValue] = useState(8);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        observer.disconnect();
        let n = 1;
        setValue(n);
        timer = setInterval(() => {
          if (touched.current || n >= 8) return clearInterval(timer);
          n += 1;
          setValue(n);
        }, 260);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  const set = (n: number) => {
    touched.current = true;
    setValue(n);
  };
  const active = levelOf(value);
  const level = LEVELS[active];

  return (
    <div ref={ref} className="mx-auto max-w-xl">
      <div className="flex items-end justify-center gap-4 md:gap-10">
        {LEVELS.map((l, i) => (
          <button
            key={l.key}
            type="button"
            onClick={() => set(l.pick)}
            aria-label={`${labels.ranges[i]}, ${labels[l.key]}`}
            className="flex w-24 flex-col items-center rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-hot md:w-32"
          >
            <img
              src={`/blobs/${l.blob}.svg`}
              alt=""
              aria-hidden
              draggable={false}
              className={`select-none transition-all duration-300 ${
                i === active ? "h-28 w-28 opacity-100 md:h-36 md:w-36" : "h-16 w-16 opacity-35 md:h-20 md:w-20"
              }`}
            />
            <span className={`mt-3 text-sm ${i === active ? "font-bold text-ink" : "text-ink-3"}`}>
              {labels.ranges[i]}
            </span>
            <span className={`text-sm ${i === active ? "text-ink" : "text-ink-3"}`}>{labels[l.key]}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-5">
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          aria-label={labels.question}
          aria-valuetext={`${value}, ${labels[level.key]}`}
          className="intensity-range flex-1"
          style={{ "--fill": `${((value - 1) / 9) * 100}%`, "--color": level.color } as CSSProperties}
        />
        <span className="w-12 text-right text-4xl font-extrabold tabular-nums tracking-tight text-ink" aria-hidden>
          {value}
        </span>
      </div>
      <p className="mt-5 text-center text-sm text-ink-3">{labels.hint}</p>
    </div>
  );
}
