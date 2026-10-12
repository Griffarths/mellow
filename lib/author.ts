import { ABOUT_PATH, aboutUrl } from "./about";

// The blog's author. Shown under each article title, in the author box at the
// end of the article and in the structured data (BlogPosting.author).
export const AUTHOR = {
  name: "Laurine Nicoletti",
  mascot: "/blobs/Fleur1.svg",
} as const;

// The About page, in the visitor's language.
export function aboutPath(locale: string) {
  return ABOUT_PATH[locale] ?? ABOUT_PATH.en;
}

export { aboutUrl };
