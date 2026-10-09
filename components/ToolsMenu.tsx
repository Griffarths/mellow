"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

type Props = {
  label: string;
  items: Array<{ href: string; label: string; description: string }>;
  className?: string;
};

export function ToolsMenu({ label, items, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-ink-2 transition hover:text-ink group-data-[solid=false]/nav:text-ink"
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        // Desktop only: phones get the resources in MobileMenu.
        <div className="absolute left-0 top-full z-50 mt-3 w-64 rounded-card bg-white p-1.5 shadow-soft ring-1 ring-surface-line">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-btn px-3 py-2.5 transition hover:bg-surface-soft"
            >
              <span className="block text-sm font-semibold text-ink">{item.label}</span>
              <span className="mt-0.5 block text-caption text-ink-3">{item.description}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
