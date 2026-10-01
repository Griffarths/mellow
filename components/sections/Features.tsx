import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { TONES, type Tone } from "@/lib/tones";

// Right under the hero: says plainly what the app is and does, before the
// screenshots show it. White background, columns split by thin rules.
const FEATURES: Array<{ id: "log" | "understand" | "doctor"; tone: Tone; icon: ReactNode }> = [
  {
    id: "log",
    tone: "fleur",
    // A phone with a plus: adding an attack.
    icon: (
      <>
        <rect x="5" y="2.5" width="14" height="19" rx="3" />
        <path d="M12 9v6M9 12h6" />
      </>
    ),
  },
  {
    id: "understand",
    tone: "tagada",
    // A rising trend line.
    icon: (
      <>
        <path d="M3.5 19.5h17" />
        <path d="m4.5 15 4.5-4.5 3.5 3 7-7" />
        <path d="M15 6.5h4.5V11" />
      </>
    ),
  },
  {
    id: "doctor",
    tone: "sable",
    // A report page.
    icon: (
      <>
        <path d="M14 2.5H7a2.5 2.5 0 0 0-2.5 2.5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8z" />
        <path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h5" />
      </>
    ),
  },
];

export function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="pb-4 pt-10 md:pb-0 md:pt-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-balance text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        {/* From md, the columns share their rows (subgrid) so icons, titles
            and texts line up even when a title wraps in one language. */}
        <div className="mt-10 grid divide-y divide-surface-line md:mt-14 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:divide-x md:divide-y-0">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="py-8 first:pt-0 last:pb-0 md:row-span-3 md:grid md:grid-rows-subgrid md:px-8 md:py-0 md:first:pl-0 md:last:pr-0 lg:px-10"
            >
              <span
                aria-hidden
                className={`grid h-12 w-12 place-items-center rounded-btn text-ink ${TONES[f.tone].tint}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-balance text-h3 text-ink">{t(`${f.id}.title`)}</h3>
              <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">{t(`${f.id}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
