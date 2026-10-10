import { useTranslations } from "next-intl";
import { StoreBadges } from "../StoreBadges";
import { Blob } from "../phones/Blob";

export function FinalCta() {
  const t = useTranslations("finalCta");
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <div className="flex justify-center">
          <Blob name="Fleur1" className="breathe h-20 w-20 md:h-24 md:w-24" />
        </div>
        <h2 className="mt-6 text-h2 text-ink">{t("title")}</h2>
        <StoreBadges className="mt-8" />
      </div>
    </section>
  );
}
