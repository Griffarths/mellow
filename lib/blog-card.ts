// What the article cards need, without the file system: usable in the browser
// (blog search) as well as on the server.
import type { BlogLocale } from "./blog";

// Mascot covers (/blobs/*.svg) are drawn small on the tone's tint; any other
// cover is a full image that fills the frame.
export function isMascotCover(src: string): boolean {
  return src.startsWith("/blobs/");
}

// What a card shows. Also sent to the browser for the blog search, so it never
// carries the article body.
export type CardArticle = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  locale: BlogLocale;
  readingTime: { minutes: number };
  category?: string;
};
