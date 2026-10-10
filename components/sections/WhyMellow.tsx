import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { TONES, type Tone } from "@/lib/tones";

// After the phone section: three reasons to pick Mellow, in columns split
// by thin rules, each with a line icon in a soft round tint. Icon shapes
// from Lucide (ISC licence).
const REASONS: Array<{ id: "free" | "founder" | "doctor"; tone: Tone; icon: ReactNode }> = [
  {
    id: "free",
    tone: "fleur",
    // A cloud with a check: saved in the cloud.
    icon: (
      <>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="m9.5 14 2 2 3.5-3.5" />
      </>
    ),
  },
  {
    id: "founder",
    tone: "tagada",
    // A heart.
    icon: (
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    ),
  },
  {
    id: "doctor",
    tone: "sable",
    // A stethoscope.
    icon: (
      <>
        <path d="M11 2v2M5 2v2" />
        <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
        <path d="M8 15a6 6 0 0 0 12 0v-3" />
        <circle cx="20" cy="10" r="2" />
      </>
    ),
  },
];

export function WhyMellow() {
  const t = useTranslations("why");

  return (
    <section id="why" className="pt-20 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-balance text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        {/* Stacked under one another (rules between them) until there is
            room for three readable columns, then side by side with rules
            between the columns. */}
        <ul className="mx-auto mt-10 grid max-w-2xl divide-y divide-surface-line md:mt-14 min-[900px]:max-w-none min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0">
          {REASONS.map((r) => (
            <li
              key={r.id}
              className="py-8 first:pt-0 last:pb-0 min-[900px]:px-8 min-[900px]:py-0 min-[900px]:first:pl-0 min-[900px]:last:pr-0 lg:px-10"
            >
              <span
                aria-hidden
                className={`grid h-14 w-14 place-items-center rounded-full text-ink ${TONES[r.tone].tint}`}
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
                  {r.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-balance text-h3 text-ink">{t(`${r.id}.title`)}</h3>
              <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">{t(`${r.id}.text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
