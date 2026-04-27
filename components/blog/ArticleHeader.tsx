import type { Article } from "@/lib/blog";

const DEFAULT_BG = "#FFE8EC";

export function ArticleHeader({ article }: { article: Article }) {
  const bg = article.coverBgColor ?? DEFAULT_BG;
  const formatted = new Intl.DateTimeFormat(article.locale, {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));
  const minutes = Math.max(1, Math.round(article.readingTime.minutes));

  return (
    <header>
      <div
        className="flex aspect-[16/9] items-center justify-center rounded-3xl"
        style={{ background: bg }}
      >
        <img
          src={article.coverImage}
          alt=""
          aria-hidden
          draggable={false}
          className="h-40 w-40 select-none md:h-52 md:w-52"
        />
      </div>
      <h1 className="mt-10 text-4xl font-bold tracking-tight md:text-5xl">
        {article.title}
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-black/55">
        <time dateTime={article.publishedAt}>{formatted}</time>
        <span aria-hidden>·</span>
        <span>{minutes} min</span>
        {article.tags.length > 0 && (
          <>
            <span aria-hidden>·</span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/[0.05] px-2 py-0.5 text-xs text-black/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
