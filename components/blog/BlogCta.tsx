import { useTranslations } from "next-intl";
import { AppStoreButton } from "@/components/AppStoreButton";

export function BlogCta() {
  const t = useTranslations("blog");
  return (
    <aside className="mt-16 rounded-3xl bg-mellow-pink/30 p-8 text-center md:p-12">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
        {t("ctaTitle")}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-black/70">{t("ctaSubtitle")}</p>
      <div className="mt-6 flex justify-center">
        <AppStoreButton />
      </div>
    </aside>
  );
}
