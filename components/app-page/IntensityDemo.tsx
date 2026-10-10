"use client";

import { useEffect, useRef, useState } from "react";

type Labels = { question: string; mild: string; moderate: string; intense: string; save: string };

// As in the app (CalendrierView): 1 to 3 is the pink Mellow, 4 to 6 the blue
// one, 7 to 10 the red one, each with its colour.
function level(n: number) {
  if (n <= 3) return { blob: "Fleur1", bar: "bg-fleur", key: "mild" } as const;
  if (n <= 6) return { blob: "Tagada2", bar: "bg-tagada", key: "moderate" } as const;
  return { blob: "Croix2", bar: "bg-croix", key: "intense" } as const;
}

// "Do you have a migraine?" to play with: tap or hover a bar to set the
// intensity. Once in view it climbs alone from 1 to 8, unless the visitor
// asked for less motion.
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
        }, 230);
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
  const current = level(value);

  return (
    <div
      ref={ref}
      className="w-[290px] rounded-card bg-white p-5 text-center shadow-soft ring-1 ring-surface-line"
    >
      <p className="text-[17px] font-bold text-ink">{labels.question}</p>
      <img
        src={`/blobs/${current.blob}.svg`}
        alt=""
        aria-hidden
        draggable={false}
        className="mx-auto mt-4 h-20 w-20 select-none transition-transform duration-300 hover:scale-105"
      />
      <div className="mt-5 flex items-end justify-center gap-1.5">
        {Array.from({ length: 10 }, (_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              type="button"
              aria-label={String(n)}
              aria-pressed={n === value}
              onClick={() => set(n)}
              onMouseEnter={() => set(n)}
              className={`w-4 rounded-md transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hot ${n <= value ? current.bar : "bg-surface-soft"}`}
              style={{ height: 12 + i * 4 }}
            />
          );
        })}
      </div>
      <p className="mt-3" aria-live="polite">
        <span className="text-3xl font-extrabold tabular-nums text-ink">{value}</span>{" "}
        <span className="text-ink-3">{labels[current.key]}</span>
      </p>
      <span className="mt-4 block rounded-xl bg-ink py-2.5 text-sm font-semibold text-white">
        {labels.save}
      </span>
    </div>
  );
}
