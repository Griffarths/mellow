import type { Article } from "@/lib/blog";
import { TONES, toneForImage } from "@/lib/tones";
import { typographize } from "@/lib/typography";

export function ArticleHeader({ article }: { article: Article }) {
  const tone = TONES[toneForImage(article.coverImage)];
  const formatted = new Intl.DateTimeFormat(article.locale, {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));
  const minutes = Math.max(1, Math.round(article.readingTime.minutes));

  return (
    <header>
      <div
        className={`flex aspect-[16/9] items-center justify-center rounded-card md:aspect-[21/9] ${tone.tint}`}
      >
        <img
          src={article.coverImage}
          alt=""
          aria-hidden
          draggable={false}
          className="breathe h-32 w-32 select-none md:h-44 md:w-44"
        />
      </div>
      <h1 className="mt-8 text-h1 text-ink md:mt-10">{typographize(article.title, article.locale)}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-ink-3">
        <time dateTime={article.publishedAt}>{formatted}</time>
        <span aria-hidden>·</span>
        <span>{minutes} min</span>
      </div>
    </header>
  );
}
