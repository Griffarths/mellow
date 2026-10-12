import { notFound } from "next/navigation";

// Any address that matches no page, in any language, shows the site's own
// "page not found" (app/[locale]/not-found.tsx) instead of Next.js's default.
export default function UnknownPage() {
  notFound();
}
