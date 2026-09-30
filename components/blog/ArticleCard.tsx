import { Link } from "@/i18n/navigation";
import type { Article } from "@/lib/blog";
import { TONES, toneForImage } from "@/lib/tones";
import { typographize } from "@/lib/typography";

type Props = {
  article: Article;
  badge?: string;
};

export function ArticleCard({ article, badge }: Props) {
  const tone = TONES[toneForImage(article.coverImage)];
  const formatted = new Intl.DateTimeFormat(article.locale, {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));
  const minutes = Math.max(1, Math.round(article.readingTime.minutes));

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-surface-line transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div
        className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden ${tone.tint}`}
      >
        {badge && (
          <span className="absolute left-4 top-4 rounded-chip bg-white px-3 py-1.5 text-caption font-bold text-ink">
            {badge}
          </span>
        )}
        <img
          src={article.coverImage}
          alt=""
          aria-hidden
          draggable={false}
          className="h-24 w-24 select-none transition-transform duration-300 group-hover:scale-105 md:h-28 md:w-28"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-center gap-2 text-caption font-semibold text-ink-3">
          <time dateTime={article.publishedAt}>{formatted}</time>
          <span aria-hidden>·</span>
          <span>{minutes} min</span>
        </div>
        <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight text-ink">
          {typographize(article.title, article.locale)}
        </h2>
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-2">
          {typographize(article.description, article.locale)}
        </p>
      </div>
    </Link>
  );
}
