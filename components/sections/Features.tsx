import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TONES, type Tone } from "@/lib/tones";

// Right under the hero: says plainly what the app is and does. Two tilted
// phones with real app screens (public/app-screens/<locale>, exported from
// Frame Studio) next to the title and the three benefits, split by thin
// rules. White background.
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
  const shots = useTranslations("screenshots");
  const locale = useLocale();

  return (
    <section id="features" className="pt-12 lg:pt-20">
      {/* Phones and tablets: title, phones, list, one column. From lg the
          phones take the left column across both rows, the title and the
          list sit on the right. */}
      <div className="mx-auto grid max-w-6xl gap-x-20 px-6 lg:grid-cols-[1fr_1.05fr]">
        <div className="mx-auto max-w-2xl text-center lg:col-start-2 lg:row-start-1 lg:mx-0 lg:self-end lg:text-left">
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-balance text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        <div className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-[360px] md:max-w-[440px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-[480px] lg:self-center">
          <Phone
            src={`/app-screens/${locale}/calendar.jpg`}
            alt={shots("alt.03")}
            className="left-[3%] top-[2%]"
          />
          <Phone
            src={`/app-screens/${locale}/log.jpg`}
            alt={shots("alt.02")}
            className="right-[3%] top-[11%]"
          />
        </div>

        <ul className="mx-auto mt-10 w-full max-w-xl divide-y divide-surface-line lg:col-start-2 lg:row-start-2 lg:mx-0 lg:mt-8 lg:max-w-none lg:self-start">
          {FEATURES.map((f) => (
            <li key={f.id} className="flex gap-5 py-6 first:pt-0 last:pb-0">
              <span
                aria-hidden
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-ink ${TONES[f.tone].tint}`}
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
              <div className="min-w-0">
                <h3 className="text-balance text-h3 text-ink">{t(`${f.id}.title`)}</h3>
                <p className="mt-1.5 text-[17px] leading-[1.65] text-ink-body">{t(`${f.id}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// A raw app screen (status bar and island included) in a thin black frame,
// tilted like the phones on the App Store page.
function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div
      className={`absolute w-[50%] -rotate-[8deg] rounded-[13%/6%] bg-ink p-[2.2%] shadow-[0_28px_50px_-18px_rgb(0_0_0/0.35)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={600}
        height={1304}
        loading="lazy"
        draggable={false}
        className="block h-auto w-full select-none rounded-[11%/5%]"
      />
    </div>
  );
}
