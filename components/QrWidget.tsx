"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { APP_STORE_URL } from "@/lib/stores";

// Remembered for the visit, from page to page (a reload included).
const STORAGE_KEY = "mellow-qr-collapsed";

const SHADOW = "shadow-[0_1px_3px_rgb(0_0_0/0.06),0_16px_32px_-12px_rgb(0_0_0/0.18)] ring-1 ring-black/[0.04]";

// From a laptop up, in the bottom right corner of every page: a white card
// with the Mellow sitting on its top edge and the App Store QR code, to scan
// with the iPhone (phones only get the badges: they cannot scan themselves).
// The cross folds it into the Mellow alone, in a round button that opens it
// again. It steps aside while an element marked data-hides-qr is on screen:
// the pink hero of the home page, which has its badge, and the final
// "Download Mellow" block, which has the same QR code. Folding and opening
// are animated (qr-* in globals.css): the card shrinks into the corner and
// the round button pops up; the card springs out of the corner and the
// Mellow hops onto it. Only after a click, never on load.
export function QrWidget() {
  const t = useTranslations("finalCta");
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [covered, setCovered] = useState(false);
  // The card on its way out, before the round button replaces it.
  const [closing, setClosing] = useState(false);
  // Set by the first click: the page loads without any animation.
  const [animate, setAnimate] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    try {
      setCollapsed(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
    setMounted(true);
  }, []);

  // Looked for again on each page: the layout, and this widget, stay.
  useEffect(() => {
    const targets = [...document.querySelectorAll("[data-hides-qr]")];
    if (!targets.length) {
      setCovered(false);
      return;
    }
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setCovered(onScreen.size > 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const fold = (value: boolean) => {
    if (closing) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, value ? "1" : "0");
    } catch {}
    setAnimate(true);
    // Opening, or with less motion: straight away. Folding: once the card
    // has shrunk (qr-out, 180ms).
    if (!value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setClosing(false);
      setCollapsed(value);
      return;
    }
    setClosing(true);
    timer.current = window.setTimeout(() => {
      setClosing(false);
      setCollapsed(true);
    }, 180);
  };

  if (!mounted) return null;

  return (
    <div
      inert={covered}
      className={`fixed bottom-6 right-6 z-40 hidden transition-opacity duration-300 lg:block ${
        covered ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {collapsed ? (
        <button
          type="button"
          onClick={() => fold(false)}
          aria-label={t("qrOpen")}
          title={t("qrOpen")}
          className={`grid h-14 w-14 place-items-center rounded-full bg-white transition hover:scale-105 ${animate ? "qr-pop" : ""} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hot ${SHADOW}`}
        >
          <img src="/blobs/Fleur1.svg" alt="" aria-hidden draggable={false} className="h-9 w-9 select-none" />
        </button>
      ) : (
        <div
          className={`relative w-[176px] rounded-[22px] bg-white px-4 pb-4 pt-9 text-center ${SHADOW} ${
            closing ? "qr-out" : animate ? "qr-in" : ""
          }`}
        >
          <img
            src="/blobs/Fleur1.svg"
            alt=""
            aria-hidden
            draggable={false}
            className={`absolute -top-7 left-1/2 h-14 w-14 -translate-x-1/2 select-none ${animate && !closing ? "qr-hop" : ""}`}
          />
          <button
            type="button"
            onClick={() => fold(true)}
            aria-label={t("qrClose")}
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-ink-3 transition hover:bg-surface-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-hot"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <p className="text-[15px] font-bold leading-tight text-ink">{t("title")}</p>
          {/* A click works too, for a visitor who would rather not scan. */}
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 block">
            <img src="/qr-app-store.svg" alt={t("qrAlt")} width={31} height={31} className="mx-auto h-32 w-32" />
          </a>
          <p className="mt-2 text-xs text-ink-3">{t("scan")}</p>
        </div>
      )}
    </div>
  );
}
