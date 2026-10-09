import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isMascotCover, type CardArticle } from "@/lib/blog-card";
import { TONES, toneForImage } from "@/lib/tones";
import { typographize } from "@/lib/typography";

// The latest article, large, at the top of the blog.
export function FeaturedArticle({ article }: { article: CardArticle }) {
  const t = useTranslations("blog");
  const tone = TONES[toneForImage(article.coverImage)];
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group grid overflow-hidden rounded-card bg-white ring-1 ring-surface-line transition hover:shadow-soft focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink md:grid-cols-2"
    >
      <div className={`order-2 flex flex-col justify-center p-7 md:order-1 md:p-12 ${tone.tint}`}>
        <span className="text-caption font-bold uppercase tracking-[0.12em] text-ink-3">
          {t("featured")}
        </span>
        {article.category && (
          <span className="mt-3 text-caption font-bold uppercase tracking-[0.08em] text-croix-ink">
            {article.category}
          </span>
        )}
        <h2 className="mt-3 text-h2 text-ink">{typographize(article.title, article.locale)}</h2>
        <p className="mt-4 line-clamp-3 text-[17px] leading-relaxed text-ink-2">
          {typographize(article.description, article.locale)}
        </p>
        <span className="mt-7 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.06em] text-ink">
          {t("readMore")}
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
      <div className={`relative order-1 aspect-[16/9] overflow-hidden md:order-2 md:aspect-auto md:min-h-[360px] ${tone.tint}`}>
        {isMascotCover(article.coverImage) ? (
          <img
            src={article.coverImage}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 select-none md:h-44 md:w-44"
          />
        ) : (
          <img
            src={article.coverImage}
            alt=""
            aria-hidden
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </div>
    </Link>
  );
}
