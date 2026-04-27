import { useTranslations } from "next-intl";

export function ComingSoon() {
  const t = useTranslations("blog.comingSoon");
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <img
        src="/blobs/Fleur1.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="h-28 w-28 select-none md:h-32 md:w-32"
      />
      <h1 className="mt-10 text-4xl font-bold tracking-tight md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 text-lg text-black/60 md:text-xl">{t("text")}</p>
      <a
        href="/blog"
        className="mt-8 inline-flex items-center rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
      >
        {t("button")}
      </a>
    </main>
  );
}
