"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Each new page opens at the very top. On its own, Next.js only brings the
// new page's content into view: with the sticky navbar it stops 4rem down,
// or does not move at all if the visitor was near the top, so a page would
// open slightly scrolled (and the pinned headers of /app and "For your
// doctor" would start their animation half way). Going back or forward keeps
// the browser's own position, and a link to an anchor keeps its anchor.
export function ScrollReset() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
