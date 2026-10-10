"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Sets data-shown once the block is a third into view, so the .app-pop and
// .app-grow-x drawings inside play their animation once (globals.css).
export function Reveal({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-shown={shown} className={className}>
      {children}
    </div>
  );
}
