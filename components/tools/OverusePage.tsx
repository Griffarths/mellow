import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreBadges } from "@/components/StoreBadges";
import type { ToolLocale } from "@/lib/tools";
import { OVERUSE_COPY, OVERUSE_PAGE, toolPaths } from "@/lib/tools";
import { typographize } from "@/lib/typography";
import { OveruseCalculator } from "./OveruseCalculator";
import { RichText } from "./RichText";

const H2 = "text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]";

export function OverusePage({ locale }: { locale: ToolLocale }) {
  const c = OVERUSE_PAGE[locale];
  const ty = (s: string) => typographize(s, locale);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-display text-ink">{ty(c.title)}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{ty(c.lead)}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-3">
            {ty(OVERUSE_COPY[locale].disclaimer)}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <OveruseCalculator
            locale={locale}
            copy={OVERUSE_COPY[locale]}
            badges={<StoreBadges align="start" sizeClass="h-10 w-auto select-none" />}
          />
        </div>

        <div className="mx-auto mt-20 max-w-[65ch]">
          <section>
            <h2 className={H2}>{ty(c.thresholdsTitle)}</h2>
            <p className="mt-5 text-[17px] leading-[1.8] text-ink-body md:text-lg">
              <RichText parts={c.thresholdsIntro} locale={locale} />
            </p>
            {/* The ICHD-3 thresholds as a plain table: easy to read, and to quote. */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[15px] leading-snug md:text-base">
                <thead>
                  <tr className="border-b border-ink-mute text-sm text-ink-3">
                    <th scope="col" className="py-3 pr-4 font-semibold">{ty(c.table.headers[0])}</th>
                    <th scope="col" className="w-[38%] py-3 font-semibold">{ty(c.table.headers[1])}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-line">
                  {c.table.rows.map(([drug, limit]) => (
                    <tr key={drug}>
                      <td className="py-3.5 pr-4 text-ink-body">{ty(drug)}</td>
                      <td className="py-3.5 font-semibold text-ink">{ty(limit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-[17px] leading-[1.8] text-ink-body md:text-lg">{ty(c.thresholdsNote)}</p>
          </section>

          <section className="mt-14">
            <h2 className={H2}>{ty(c.whatTitle)}</h2>
            {c.what.map((parts, i) => (
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
      </main>
      <Footer localePaths={toolPaths(OVERUSE_PAGE)} />
    </>
  );
}
