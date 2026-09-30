import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/Button";

export function ComingSoon() {
  const t = useTranslations("blog.comingSoon");
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <img
        src="/blobs/Fleur1.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="breathe h-28 w-28 select-none md:h-32 md:w-32"
      />
      <h1 className="mt-10 text-h1 text-ink">
        {t("title")}
      </h1>
      <p className="mt-5 text-lg text-ink-2 md:text-xl">{t("text")}</p>
      <Link
        href="/blog"
        locale="en"
        className={buttonClass("primary", "mt-8")}
      >
        {t("button")}
      </Link>
    </main>
  );
}
