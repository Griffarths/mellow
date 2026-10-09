import { useLocale, useTranslations } from "next-intl";
import { Tile } from "../ui/Tile";
import type { Tone } from "@/lib/tones";
import { getPillarArticles, hasBlog } from "@/lib/blog";
import { PILLARS, type PillarId } from "@/lib/pillars";

// Three entry points into the blog, each leading to the matching category.
const COURSES: Array<{ id: "understand" | "prevent" | "manage"; category: PillarId; tone: Tone }> =
  [
    { id: "understand", category: "symptoms", tone: "fleur" },
    { id: "prevent", category: "triggers", tone: "tagada" },
    { id: "manage", category: "treatments", tone: "sable" },
  ];

export function Courses() {
  const t = useTranslations("courses");
  const locale = useLocale();

  return (
    <section id="courses" className="py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {COURSES.map((c) => (
            <Tile
              key={c.id}
              href={
                hasBlog(locale) && getPillarArticles(locale, c.category).length > 0
                  ? `/blog/${PILLARS[c.category][locale].slug}`
                  : "/blog"
              }
              tone={c.tone}
              title={t(`${c.id}.title`)}
              subtitle={t(`${c.id}.subtitle`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
