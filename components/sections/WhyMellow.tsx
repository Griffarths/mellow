import { useTranslations } from "next-intl";

// After the phone section: three reasons to pick Mellow, each in a white
// card with a thin border and a Mellow mascot sitting on its top edge.
const REASONS: Array<{
  id: "free" | "founder" | "doctor";
  mascot: string;
  width: number;
  height: number;
}> = [
  { id: "free", mascot: "/blobs/Fleur1.svg", width: 462, height: 500 },
  { id: "founder", mascot: "/blobs/Tagada1.svg", width: 500, height: 442 },
  { id: "doctor", mascot: "/blobs/Croix1.svg", width: 500, height: 500 },
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

        {/* Room above each card for its mascot. From md, the cards share
            their rows (subgrid) so titles and texts line up even when a
            title wraps in one language. */}
        <ul className="mt-16 grid gap-y-16 md:mt-20 md:grid-cols-3 md:grid-rows-[auto_1fr] md:gap-x-6 md:gap-y-0">
          {REASONS.map((r) => (
            <li
              key={r.id}
              className="relative rounded-card border border-surface-line px-7 pb-8 pt-14 md:row-span-2 md:grid md:grid-rows-subgrid lg:px-8"
            >
              <img
                src={r.mascot}
                alt=""
                aria-hidden
                width={r.width}
                height={r.height}
                draggable={false}
                className="absolute -top-9 left-6 h-[72px] w-auto select-none lg:left-7"
              />
              <h3 className="text-balance text-h3 text-ink">{t(`${r.id}.title`)}</h3>
              <p className="mt-3 text-[17px] leading-[1.7] text-ink-body">{t(`${r.id}.text`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
