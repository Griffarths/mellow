import { useLocale, useTranslations } from "next-intl";

// Right under the hero: says plainly what the app is and does. A phone
// showing the app's real home screen (public/app-screens/<locale>/home.jpg,
// iPhone 17 Pro simulator, demo account) next to the three benefits, split
// by thin rules, each with a 3D emoji from Microsoft's Fluent Emoji
// (public/emoji; MIT licence, Copyright (c) Microsoft Corporation). White
// background.
const FEATURES: Array<{ id: "log" | "understand" | "doctor"; emoji: string }> = [
  { id: "log", emoji: "/emoji/backhand_index_pointing_up_3d_default.png" },
  { id: "understand", emoji: "/emoji/magnifying_glass_tilted_left_3d.png" },
  { id: "doctor", emoji: "/emoji/clipboard_3d.png" },
];

export function Features() {
  const t = useTranslations("features");
  const locale = useLocale();

  return (
    <section id="features" className="overflow-x-clip pt-12 lg:pt-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-ink">{t("title")}</h2>
          <p className="mt-4 text-balance text-lg text-ink-2">{t("subtitle")}</p>
        </div>

        {/* Phones: phones above the list. From md, phones on the left, the
            list on the right. */}
        <div className="mt-10 grid items-center gap-x-10 md:mt-14 md:grid-cols-2 lg:grid-cols-[1fr_1.05fr] lg:gap-x-20">
          <div className="relative mx-auto w-[240px] md:w-[260px] lg:w-[290px]">
            {/* Soft pink glow behind the phone, the hero's pink fading out.
                Wider than a phone screen: the section clips it sideways only
                (overflow-x-clip), so the phone's shadow still shows below. */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_98_169/0.22),rgb(255_98_169/0)_75%)]"
            />
            <Phone src={`/app-screens/${locale}/home.jpg`} alt={t("phoneAlt")} />
          </div>

          <ul className="mx-auto mt-10 w-full max-w-xl divide-y divide-surface-line md:mx-0 md:mt-0 md:max-w-none">
            {FEATURES.map((f) => (
              <li key={f.id} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <img
                  src={f.emoji}
                  alt=""
                  aria-hidden
                  width={256}
                  height={256}
                  loading="lazy"
                  draggable={false}
                  className="h-14 w-14 shrink-0 select-none"
                />
                <div className="min-w-0">
                  <h3 className="text-balance text-h3 text-ink">{t(`${f.id}.title`)}</h3>
                  <p className="mt-1.5 text-[17px] leading-[1.65] text-ink-body">{t(`${f.id}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// A raw app screen (status bar and island included) in an iPhone: a thin
// titanium band with a soft highlight, the black bezel, the side buttons.
// Its width comes from the parent.
const BUTTON = "absolute w-[1.6%] bg-gradient-to-r from-[#4a4a50] to-[#26262a]";

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <span aria-hidden className={`${BUTTON} -left-[1.2%] top-[17%] h-[3.4%] rounded-l-sm`} />
      <span aria-hidden className={`${BUTTON} -left-[1.2%] top-[23.5%] h-[6.5%] rounded-l-sm`} />
      <span aria-hidden className={`${BUTTON} -left-[1.2%] top-[31.5%] h-[6.5%] rounded-l-sm`} />
      <span aria-hidden className={`${BUTTON} -right-[1.2%] top-[26%] h-[10%] rotate-180 rounded-l-sm`} />
      <div className="relative rounded-[16%/7.7%] bg-gradient-to-br from-[#5b5b61] via-[#2c2c30] to-[#4a4a50] p-[1.4%] shadow-[0_2px_6px_rgb(0_0_0/0.06),0_32px_60px_-28px_rgb(0_0_0/0.25)]">
        <div className="rounded-[15%/7.1%] bg-black p-[2.6%] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]">
          <img
            src={src}
            alt={alt}
            width={600}
            height={1304}
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none rounded-[12.5%/5.75%]"
          />
        </div>
      </div>
    </div>
  );
}
