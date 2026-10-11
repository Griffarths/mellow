"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  // Home page: transparent over the pink hero until the page scrolls.
  overHero: boolean;
  children: ReactNode;
};

// The nav's <header>. Solid (plain white, with a border) on every page,
// except at the top of the home page where it lets the hero show through.
// It also turns white when the mobile menu is open. While transparent, the
// .nav-on-hero elements (wordmark, links, burger) turn white (globals.css,
// through data-solid).
export function NavShell({ overHero, children }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overHero]);

  const solid = !overHero || scrolled;

  // The same plain white everywhere, no blur.
  const look = solid
    ? "border-surface-line bg-white"
    : "border-transparent bg-transparent has-[#mobile-menu]:border-surface-line has-[#mobile-menu]:bg-white";

  return (
    <header
      data-solid={solid}
      className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-300 ${look}`}
    >
      {children}
    </header>
  );
}
