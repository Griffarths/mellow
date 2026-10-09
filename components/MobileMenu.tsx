"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Item = { href: string; label: string; description?: string };

type Props = {
  resourcesTitle: string;
  resources: Item[];
  // Blog and Android; external links open in a new tab.
  links: Array<Item & { external?: boolean }>;
  download: {
    label: string;
    appStoreUrl: string;
    // Play Store URL once public, else the Android tester page.
    androidHref: string;
    androidExternal: boolean;
  };
  openLabel: string;
  closeLabel: string;
  // Store badges rendered on the server, shown at the bottom of the menu.
  badges: ReactNode;
};

// Phones and small tablets: a download button and a burger that opens a
// full-height menu under the header. Hidden from md, where the nav shows its
// links.
export function MobileMenu({
  resourcesTitle,
  resources,
  links,
  download,
  openLabel,
  closeLabel,
  badges,
}: Props) {
  const [open, setOpen] = useState(false);
  // Android visitors get the Android page instead of the App Store. Read
  // after mount so the server and first client render match.
  const [isAndroid, setIsAndroid] = useState(false);
  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const downloadClass =
    "inline-flex h-9 items-center whitespace-nowrap rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/85";

  return (
    <div className="flex shrink-0 items-center gap-1.5 md:hidden">
      {isAndroid && !download.androidExternal ? (
        <Link href={download.androidHref} className={downloadClass}>
          {download.label}
        </Link>
      ) : (
        <a
          href={isAndroid ? download.androidHref : download.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={downloadClass}
        >
          {download.label}
        </a>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="nav-on-hero grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-surface-soft focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-hot"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* The header's backdrop blur makes it the containing block of fixed
          children: top-16 is right under it, and the height is set
          explicitly. */}
      {open && (
        <nav
          id="mobile-menu"
          className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-surface-line bg-white px-6 pb-10 pt-6"
        >
          <p className="text-caption font-bold uppercase tracking-[0.08em] text-croix-ink">{resourcesTitle}</p>
          <ul className="mt-2 divide-y divide-surface-line">
            {resources.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="block py-3.5">
                  <span className="block text-base font-semibold text-ink">{item.label}</span>
                  {item.description && (
                    <span className="mt-0.5 block text-sm leading-snug text-ink-3">{item.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-4 divide-y divide-surface-line border-t border-surface-line">
            {links.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={close} className="block py-3.5 text-base font-semibold text-ink">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} onClick={close} className="block py-3.5 text-base font-semibold text-ink">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8">{badges}</div>
        </nav>
      )}
    </div>
  );
}
