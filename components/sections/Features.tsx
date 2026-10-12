import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DOCTOR_PATH } from "@/lib/doctor";
import { Phone } from "../PhoneFrame";
import { LINK_CLASS } from "../tools/RichText";

// Right under the hero: says plainly what the app is and does. A phone
// showing the app's real home screen (public/app-screens/<locale>/home.jpg,
// iPhone 17 Pro simulator, demo account) next to the three benefits, split
// by thin rules, each with a 3D emoji from Microsoft's Fluent Emoji
// (public/emoji; MIT licence, Copyright (c) Microsoft Corporation). The
// reports benefit links to the "For your doctor" page, and the list ends with
// a link to the /app page. White background.
const FEATURES: Array<{ id: "log" | "understand" | "doctor"; emoji: string }> = [
  { id: "log", emoji: "/emoji/backhand_index_pointing_up_3d_default.png" },
  { id: "understand", emoji: "/emoji/magnifying_glass_tilted_left_3d.png" },
  { id: "doctor", emoji: "/emoji/clipboard_3d.png" },
];

export function Features() {
  const t = useTranslations("features");
  const locale = useLocale();
  const doctor = DOCTOR_PATH[locale] ?? DOCTOR_PATH.en;

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

          <div className="mx-auto mt-10 w-full max-w-xl md:mx-0 md:mt-0 md:max-w-none">
            <ul className="divide-y divide-surface-line">
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
                    {f.id === "doctor" && (
                      <Link href={doctor} className={`mt-3 inline-block text-[17px] ${LINK_CLASS}`}>
                        {t("doctor.link")}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {/* Lined up with the texts, past the emoji (3.5rem + 1.25rem). */}
            <p className="mt-8 pl-[4.75rem] text-[17px]">
              <Link href="/app" className={LINK_CLASS}>
                {t("appLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
