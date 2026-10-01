import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isMascotCover, type Article } from "@/lib/blog";
import type { PillarLink } from "@/lib/pillar-link";
import { TONES, toneForImage } from "@/lib/tones";
import { typographize } from "@/lib/typography";

export function ArticleHeader({
  article,
  pillar,
}: {
  article: Article;
  pillar: PillarLink;
}) {
  const tc = useTranslations("courses");
  const tone = TONES[toneForImage(article.coverImage)];
  const formatted = new Intl.DateTimeFormat(article.locale, {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));
  const minutes = Math.max(1, Math.round(article.readingTime.minutes));

  return (
    <header>
      <div
        className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-card md:aspect-[21/9] ${tone.tint}`}
      >
        {isMascotCover(article.coverImage) ? (
          <img
            src={article.coverImage}
            alt=""
            aria-hidden
            draggable={false}
            className="breathe h-32 w-32 select-none md:h-44 md:w-44"
          />
        ) : (
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? ""}
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
          />
        )}
      </div>
      {pillar && (
        <Link
          href={pillar.href}
          className="mt-8 inline-block text-caption font-bold uppercase tracking-[0.08em] text-croix-ink transition hover:text-ink md:mt-10"
        >
          {tc(`${pillar.id}.title`)}
        </Link>
      )}
      <h1 className={`text-h1 text-ink ${pillar ? "mt-3" : "mt-8 md:mt-10"}`}>{typographize(article.title, article.locale)}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-ink-3">
        <time dateTime={article.publishedAt}>{formatted}</time>
        <span aria-hidden>·</span>
        <span>{minutes} min</span>
      </div>
    </header>
  );
}
