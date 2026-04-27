import { Link } from "@/i18n/navigation";
import type { Article } from "@/lib/blog";

const DEFAULT_BG = "#FFE8EC";

export function ArticleCard({ article }: { article: Article }) {
  const bg = article.coverBgColor ?? DEFAULT_BG;
  const formatted = new Intl.DateTimeFormat(article.locale, {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));
  const minutes = Math.max(1, Math.round(article.readingTime.minutes));

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div
        className="flex aspect-[16/10] items-center justify-center"
        style={{ background: bg }}
      >
        <img
          src={article.coverImage}
          alt=""
          aria-hidden
          draggable={false}
          className="h-28 w-28 select-none transition group-hover:scale-105 md:h-32 md:w-32"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-black/50">
          <time dateTime={article.publishedAt}>{formatted}</time>
          <span aria-hidden>·</span>
          <span>{minutes} min</span>
        </div>
        <h2 className="mt-3 text-xl font-bold tracking-tight">
          {article.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-black/60">
          {article.description}
        </p>
        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
