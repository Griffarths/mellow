import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreBadges } from "@/components/StoreBadges";
import type { ToolLocale } from "@/lib/tools";
import { TEST_COPY, TEST_PAGE, toolPaths } from "@/lib/tools";
import { typographize } from "@/lib/typography";
import { MigraineTest } from "./MigraineTest";
import { RichText } from "./RichText";

export function TestPage({ locale }: { locale: ToolLocale }) {
  const c = TEST_PAGE[locale];
  const ty = (s: string) => typographize(s, locale);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-display text-ink">{ty(c.title)}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{ty(c.lead)}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-3">
            {ty(TEST_COPY[locale].disclaimer)}
          </p>

          <div className="mt-10">
            <MigraineTest
              locale={locale}
              copy={TEST_COPY[locale]}
              badges={<StoreBadges align="start" sizeClass="h-11 w-auto select-none md:h-12" />}
            />
          </div>

          <div className="mx-auto mt-20 max-w-[65ch]">
            <section>
              <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]">
                {ty(c.howTitle)}
              </h2>
              {c.how.map((parts, i) => (
                <p key={i} className="mt-5 text-[17px] leading-[1.8] text-ink-body md:text-lg">
                  <RichText parts={parts} locale={locale} />
                </p>
              ))}
            </section>

            <section className="mt-16 border-t border-surface-line pt-12">
              <h2 className="text-h3 text-ink md:text-[28px]">{ty(c.faqTitle)}</h2>
              <div className="mt-6 divide-y divide-surface-line">
                {c.faq.map((f) => (
                  <div key={f.q} className="py-6 first:pt-0 last:pb-0">
                    <h3 className="text-lg font-bold tracking-tight text-ink">{ty(f.q)}</h3>
                    <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">{ty(f.a)}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer localePaths={toolPaths(TEST_PAGE)} />
    </>
  );
}
