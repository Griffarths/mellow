import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BlogCta } from "@/components/blog/BlogCta";
import { buttonClass } from "@/components/ui/Button";
import type { ToolLocale } from "@/lib/tools";
import { CYCLE_DIARY, DIARY, toolPaths } from "@/lib/tools";
import { previewUrl } from "@/lib/tools-seo";
import { versioned } from "@/lib/diary-assets";
import { typographize } from "@/lib/typography";
import { RichText } from "./RichText";

type Props = {
  locale: ToolLocale;
  // The monthly diary, or the three-month diary that follows the cycle.
  tool?: "diary" | "cycleDiary";
};

export function DiaryPage({ locale, tool = "diary" }: Props) {
  const all = tool === "cycleDiary" ? CYCLE_DIARY : DIARY;
  const c = all[locale];
  // The monthly diary opens on a portrait calendar; the cycle diary's two
  // pages are both landscape.
  const portraitFirst = tool === "diary";
  const ty = (s: string) => typographize(s, locale);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-28 md:pt-16">
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <h1 className="text-display text-ink">{ty(c.title)}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{ty(c.lead)}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {c.downloads.map((d) => (
                <a
                  key={d.href}
                  href={versioned(d.href)}
                  download
                  className={buttonClass(d.primary ? "primary" : "secondary")}
                >
                  {d.primary && (
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 16.5h12" />
                    </svg>
                  )}
                  {d.label}
                </a>
              ))}
            </div>
            <p className="mt-3 text-sm text-ink-3">{c.downloadNote}</p>
          </div>

          {/* Straight previews (no rotation, which blurs thin lines): the
              calendar behind, the landscape log in front, fully readable. */}
          <div
            className={`relative mx-auto w-full max-w-lg ${portraitFirst ? "aspect-[1/1.08]" : "aspect-[1/0.9]"}`}
          >
            <img
              src={previewUrl(tool, locale, 1)}
              alt={c.previewAlt[0]}
              width={portraitFirst ? 1588 : 2245}
              height={portraitFirst ? 2245 : 1588}
              className={`absolute left-0 top-0 rounded-btn shadow-soft ring-1 ring-surface-line ${portraitFirst ? "w-[68%]" : "w-[84%]"}`}
            />
            <img
              src={previewUrl(tool, locale, 2)}
              alt={c.previewAlt[1]}
              width={2245}
              height={1588}
              className={`absolute bottom-0 right-0 rounded-btn shadow-[0_24px_48px_-20px_rgb(0_0_0/0.28)] ring-1 ring-surface-line ${portraitFirst ? "w-[78%]" : "w-[84%]"}`}
            />
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-[65ch] md:mt-28">
          <section>
            <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]">
              {ty(c.whyTitle)}
            </h2>
            {c.why.map((parts, i) => (
              <p key={i} className="mt-5 text-[17px] leading-[1.8] text-ink-body md:text-lg">
                <RichText parts={parts} locale={locale} />
              </p>
            ))}
          </section>

          <section className="mt-14">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]">
              {ty(c.howTitle)}
            </h2>
            <ol className="mt-6 space-y-4">
              {c.steps.map((step, i) => (
                <li key={i} className="flex gap-4 text-[17px] leading-[1.7] text-ink-body md:text-lg">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{ty(step)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]">
              {ty(c.doctorTitle)}
            </h2>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.8] text-ink-body marker:text-croix-accent md:text-lg">
              {c.doctor.map((d) => (
                <li key={d} className="pl-2">
                  {ty(d)}
                </li>
              ))}
            </ul>
          </section>

          <BlogCta title={ty(c.appTitle)} text={ty(c.appText)} />

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
      <Footer localePaths={toolPaths(all)} />
    </>
  );
}
