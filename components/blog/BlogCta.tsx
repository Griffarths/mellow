import { useTranslations } from "next-intl";
import { StoreBadges } from "@/components/StoreBadges";

type Props = {
  title?: string;
  text?: string;
};

// End-of-article CTA. Articles set their own title/text through
// <AppCta variant="end" />; without it the generic copy is used.
export function BlogCta({ title, text }: Props) {
  const t = useTranslations("blog");
  return (
    <aside className="relative mt-16 overflow-hidden rounded-card bg-hero p-7 pb-24 md:p-10 md:pr-60">
      <p className="text-h3 text-ink md:text-[28px]">{title ?? t("ctaTitle")}</p>
      <p className="mt-3 max-w-md text-ink-2">{text ?? t("ctaSubtitle")}</p>
      <StoreBadges
        align="start"
        className="relative z-10 mt-6"
        sizeClass="h-12 w-auto select-none md:h-14"
      />
      <img
        src="/blobs/Fleur1.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -bottom-8 -right-6 h-32 w-32 select-none md:-bottom-10 md:-right-8 md:h-52 md:w-52"
      />
    </aside>
  );
}
