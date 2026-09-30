import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogLocale } from "@/lib/blog";
import { PILLARS, PILLAR_IDS, type PillarId } from "@/lib/pillars";
import { TONES } from "@/lib/tones";

type Props = {
  locale: BlogLocale;
  current?: PillarId;
  className?: string;
};

export function PillarNav({ locale, current, className = "" }: Props) {
  const t = useTranslations("blog");
  // One swipeable row on mobile, wrapping from md.
  return (
    <nav
      aria-label={t("themes")}
      className={`-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {PILLAR_IDS.map((id) => {
        const active = id === current;
        return (
          <Link
            key={id}
            href={`/blog/${PILLARS[id][locale].slug}`}
            aria-current={active ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-chip py-2 pl-2.5 pr-4 text-sm font-semibold transition ${
              active
                ? "bg-ink text-white"
                : "bg-surface-soft text-ink hover:bg-surface-line"
            }`}
          >
            <img
              src={TONES[PILLARS[id].tone].mascot}
              alt=""
              aria-hidden
              className="h-6 w-6 select-none"
              draggable={false}
            />
            {PILLARS[id][locale].title}
          </Link>
        );
      })}
    </nav>
  );
}
