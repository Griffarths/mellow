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
    // Sized to sit inside a text: title below the article's h2, same 40px
    // store button as the mid-article card and the nav.
    <aside className="relative mt-16 overflow-hidden rounded-card bg-hero p-6 pb-16 md:p-8 md:pr-48">
      <p className="text-h3 text-ink md:text-[22px]">{title ?? t("ctaTitle")}</p>
      <p className="mt-2 max-w-md text-ink-2">{text ?? t("ctaSubtitle")}</p>
      <StoreBadges
        align="start"
        className="relative z-10 mt-5"
        sizeClass="h-10 w-auto select-none"
      />
      <img
        src="/blobs/Fleur1.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -bottom-5 -right-4 h-24 w-24 select-none md:-bottom-8 md:-right-6 md:h-40 md:w-40"
      />
    </aside>
  );
}
