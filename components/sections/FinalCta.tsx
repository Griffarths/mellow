import { useTranslations } from "next-intl";
import { AppStoreButton } from "../AppStoreButton";
import { Blob } from "../phones/Blob";
import { Clouds } from "../ui/Clouds";

export function FinalCta() {
  const t = useTranslations("finalCta");
  return (
    <section className="relative overflow-hidden bg-hero">
      <Clouds flip />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-6 text-center md:pb-28">
        <div className="flex justify-center">
          <Blob name="Fleur1" className="breathe h-28 w-28 md:h-36 md:w-36" />
        </div>
        <h2 className="mt-6 text-h2 text-ink">{t("title")}</h2>
        <div className="mt-8 flex justify-center">
          <AppStoreButton />
        </div>
      </div>
    </section>
  );
}
