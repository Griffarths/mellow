import { useTranslations } from "next-intl";
import { AppStoreButton } from "@/components/AppStoreButton";

export function BlogCta() {
  const t = useTranslations("blog");
  return (
    <aside className="relative mt-16 overflow-hidden rounded-card bg-hero p-7 pb-24 md:p-10 md:pr-60">
      <h2 className="text-h3 text-ink md:text-[28px]">{t("ctaTitle")}</h2>
      <p className="mt-3 max-w-md text-ink-2">{t("ctaSubtitle")}</p>
      <div className="mt-6">
        <AppStoreButton sizeClass="h-12 w-auto select-none md:h-14" />
      </div>
      <img
        src="/blobs/Fleur1.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -bottom-8 -right-6 h-32 w-32 select-none md:-bottom-10 md:right-4 md:h-52 md:w-52"
      />
    </aside>
  );
}
