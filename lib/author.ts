// The blog's author. Shown under each article title, in the author box at the
// end of the article and in the structured data (BlogPosting.author).
export const AUTHOR = {
  name: "Laurine Nicoletti",
  mascot: "/blobs/Fleur1.svg",
} as const;

// The About page exists in French and English only; other languages link to
// the English one.
export function aboutPath(locale: string): { href: string; external: boolean } {
  if (locale === "fr") return { href: "/a-propos", external: false };
  if (locale === "en") return { href: "/about", external: false };
  return { href: "https://mellowmigraine.com/about", external: true };
}

export function aboutUrl(locale: string): string {
  return locale === "fr"
    ? "https://mellowmigraine.com/fr/a-propos"
    : "https://mellowmigraine.com/about";
}
