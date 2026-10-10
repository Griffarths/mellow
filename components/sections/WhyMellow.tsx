import { useTranslations } from "next-intl";

// After the phone section: three reasons to pick Mellow, one row each,
// split by thin rules, each with a 3D emoji from Microsoft's Fluent Emoji
// (public/emoji; MIT licence, Copyright (c) Microsoft Corporation).
const REASONS: Array<{ id: "free" | "founder" | "doctor"; emoji: string }> = [
  { id: "free", emoji: "/emoji/mobile_phone_3d.png" },
  { id: "founder", emoji: "/emoji/woman_technologist_3d_default.png" },
  { id: "doctor", emoji: "/emoji/stethoscope_3d.png" },
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

        {/* One row per reason, thin rules between rows only: emoji and
            title on the left, the text on the right with room to breathe.
            Phones: the text goes under the title. */}
        <ul className="mx-auto mt-10 max-w-5xl divide-y divide-surface-line md:mt-14">
          {REASONS.map((r) => (
            <li
              key={r.id}
              className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:py-10"
            >
              <div className="flex items-center gap-5">
                <img
                  src={r.emoji}
                  alt=""
                  aria-hidden
                  width={256}
                  height={256}
                  loading="lazy"
                  draggable={false}
                  className="h-14 w-14 shrink-0 select-none"
                />
                <h3 className="text-balance text-h3 text-ink">{t(`${r.id}.title`)}</h3>
              </div>
              <p className="text-[17px] leading-[1.7] text-ink-body">{t(`${r.id}.text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
