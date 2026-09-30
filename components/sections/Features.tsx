import { useTranslations } from "next-intl";

type FeatureMeta = {
  id: "logging" | "triggers" | "pressure" | "stats";
  bg: string;
  image: string;
  span: "big" | "small";
  multilineTitle: boolean;
  inlineOnMobile?: boolean;
};

const FEATURES: FeatureMeta[] = [
  {
    id: "logging",
    bg: "bg-croix-tint",
    image: "/assets/Migraine3%28site%29.svg",
    span: "big",
    multilineTitle: true,
  },
  {
    id: "triggers",
    bg: "bg-sable-tint",
    image: "/assets/Historique.svg",
    span: "small",
    multilineTitle: false,
  },
  {
    id: "pressure",
    bg: "bg-tagada-tint",
    image: "/assets/Pression.svg",
    span: "small",
    multilineTitle: false,
  },
  {
    id: "stats",
    bg: "bg-fleur-tint",
    image: "/assets/Analyse.svg",
    span: "big",
    multilineTitle: true,
    inlineOnMobile: true,
  },
];

export function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <h2 className="text-center text-h2 text-ink md:text-left">
            <span className="md:block md:whitespace-nowrap">
              {t("title.line1")}
            </span>{" "}
            <span className="md:block md:whitespace-nowrap">
              {t("title.line2")}
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className={`flex flex-col justify-between rounded-card p-6 md:p-8 ${f.bg} ${
                f.span === "big" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <img
                src={f.image}
                alt=""
                aria-hidden
                draggable={false}
                className="h-16 w-16 select-none rounded-btn md:h-20 md:w-20 md:rounded-card"
              />
              <div className="mt-10 md:mt-16">
                <h3 className="text-h3 text-ink">
                  {f.multilineTitle ? (
                    <>
                      <span
                        className={f.inlineOnMobile ? "md:block" : "block"}
                      >
                        {t(`${f.id}.title.line1`)}
                      </span>{" "}
                      <span
                        className={f.inlineOnMobile ? "md:block" : "block"}
                      >
                        {t(`${f.id}.title.line2`)}
                      </span>
                    </>
                  ) : (
                    t(`${f.id}.title`)
                  )}
                </h3>
                <p className="mt-2 max-w-md text-base text-ink-2">
                  {t(`${f.id}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
