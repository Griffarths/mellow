import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DOCTOR_PATH } from "@/lib/doctor";
import { TOOLS_LABEL, isToolLocale, toolsMenu } from "@/lib/tools";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFoundPage");
  return { title: t("metaTitle") };
}

const ROW = "flex items-center justify-between gap-4 py-4 text-[17px] font-semibold text-ink transition hover:text-croix-ink";

// The site's "page not found", in the visitor's language: the Mellow, the
// title, a sentence, then the pages of the menu in a list between rules, the
// free tools by name (they have no page of their own).
export default function NotFound() {
  const t = useTranslations("notFoundPage");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const tools = isToolLocale(locale) ? toolsMenu(locale) : [];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-xl px-6 py-16 text-center md:py-24">
        <img
          src="/blobs/Fleur1.svg"
          alt=""
          aria-hidden
          width={462}
          height={500}
          draggable={false}
          className="mx-auto h-auto w-20 select-none md:w-24"
        />
        <h1 className="mt-8 text-balance text-h2 text-ink">{t("title")}</h1>
        <p className="mt-4 text-[17px] leading-[1.7] text-ink-body md:text-lg">{t("text")}</p>

        <nav className="mt-10 divide-y divide-surface-line border-y border-surface-line text-left">
          <Link href="/app" className={ROW}>
            {nav("app")}
            <span aria-hidden className="text-ink-3">→</span>
          </Link>
          <Link href={DOCTOR_PATH[locale] ?? DOCTOR_PATH.en} className={ROW}>
            {nav("doctor")}
            <span aria-hidden className="text-ink-3">→</span>
          </Link>
          {tools.length > 0 && isToolLocale(locale) && (
            <div className="py-4">
              <p className="text-[17px] font-semibold text-ink">{TOOLS_LABEL[locale]}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[15px] text-ink-3">
                {tools.map((tool) => (
                  <Link key={tool.path} href={tool.path} className="transition hover:text-croix-ink">
                    {tool.navLabel}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Link href="/blog" className={ROW}>
            {nav("blog")}
            <span aria-hidden className="text-ink-3">→</span>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
