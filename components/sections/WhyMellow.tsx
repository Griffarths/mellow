import { useTranslations } from "next-intl";

// After the phone section: three reasons to pick Mellow, in columns split
// by thin rules, each opened by a 3D emoji from Microsoft's Fluent Emoji
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

        {/* Stacked under one another (rules between them) until there is
            room for three readable columns, then side by side with rules
            between the columns. */}
        <ul className="mx-auto mt-10 grid max-w-2xl divide-y divide-surface-line md:mt-14 min-[900px]:max-w-none min-[900px]:grid-cols-3 min-[900px]:divide-x min-[900px]:divide-y-0">
          {REASONS.map((r) => (
            <li
              key={r.id}
              className="py-8 first:pt-0 last:pb-0 min-[900px]:px-8 min-[900px]:py-0 min-[900px]:first:pl-0 min-[900px]:last:pr-0 lg:px-10"
            >
              <img
                src={r.emoji}
                alt=""
                aria-hidden
                width={256}
                height={256}
                loading="lazy"
                draggable={false}
                className="h-16 w-16 select-none"
              />
              <h3 className="mt-5 text-balance text-h3 text-ink">{t(`${r.id}.title`)}</h3>
              <p className="mt-2 text-[17px] leading-[1.7] text-ink-body">{t(`${r.id}.text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
