import { useTranslations } from "next-intl";

type FeatureMeta = {
  id: "logging" | "triggers" | "pressure" | "stats";
  bg: string;
  image: string;
  span: "big" | "small";
  multilineTitle: boolean;
};

const FEATURES: FeatureMeta[] = [
  {
    id: "logging",
    bg: "bg-[#FFE5E5]",
    image: "/assets/Migraine3%28site%29.svg",
    span: "big",
    multilineTitle: true,
  },
  {
    id: "triggers",
    bg: "bg-[#FADFCC]",
    image: "/assets/Historique.svg",
    span: "small",
    multilineTitle: false,
  },
  {
    id: "pressure",
    bg: "bg-[#DFE8F5]",
    image: "/assets/Pression.svg",
    span: "small",
    multilineTitle: false,
  },
  {
    id: "stats",
    bg: "bg-[#FADFEA]",
    image: "/assets/Analyse.svg",
    span: "big",
    multilineTitle: true,
  },
];

export function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div>
          <h2 className="section-title text-center text-4xl font-bold md:text-left md:text-6xl">
            <span className="block md:whitespace-nowrap">
              {t("title.line1")}
            </span>
            <span className="block md:whitespace-nowrap">
              {t("title.line2")}
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className={`flex flex-col justify-between rounded-[32px] p-8 md:rounded-[40px] md:p-10 ${f.bg} ${
                f.span === "big" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <img
                src={f.image}
                alt=""
                aria-hidden
                draggable={false}
                className="h-16 w-16 select-none rounded-2xl md:h-20 md:w-20 md:rounded-3xl"
              />
              <div className="mt-16 md:mt-24">
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {f.multilineTitle ? (
                    <>
                      {t(`${f.id}.title.line1`)}
                      <br />
                      {t(`${f.id}.title.line2`)}
                    </>
                  ) : (
                    t(`${f.id}.title`)
                  )}
                </h3>
                <p className="mt-3 max-w-md text-base text-black/60 md:text-lg">
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
