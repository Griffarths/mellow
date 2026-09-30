import { useTranslations } from "next-intl";
import { Tile } from "../ui/Tile";
import type { Tone } from "@/lib/tones";

const COURSES: Array<{ id: "understand" | "prevent" | "manage"; tone: Tone }> =
  [
    { id: "understand", tone: "fleur" },
    { id: "prevent", tone: "tagada" },
    { id: "manage", tone: "sable" },
  ];

export function Courses() {
  const t = useTranslations("courses");

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
              href="/blog"
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
