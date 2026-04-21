import { useTranslations } from "next-intl";

type CourseMeta = {
  id: "understand" | "prevent" | "manage";
  bg: string;
  image: string;
};

const COURSES: CourseMeta[] = [
  {
    id: "understand",
    bg: "bg-[#F4C1D8]",
    image: "/assets/Comprendre3.svg",
  },
  {
    id: "prevent",
    bg: "bg-[#BFD4EE]",
    image: "/assets/Prevenir.svg",
  },
  {
    id: "manage",
    bg: "bg-[#F1C1A6]",
    image: "/assets/Gerer.svg",
  },
];

export function Courses() {
  const t = useTranslations("courses");

  return (
    <section id="courses" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-black/60 md:text-xl">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {COURSES.map((c) => (
            <div
              key={c.id}
              className={`relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[32px] p-8 md:rounded-[40px] md:p-10 ${c.bg}`}
            >
              <div className="flex items-center justify-center py-6 md:py-8">
                <img
                  src={c.image}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="h-40 w-40 select-none md:h-48 md:w-48"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {t(`${c.id}.title`)}
                </h3>
                <p className="mt-2 text-sm text-black/60 md:text-base">
                  {t(`${c.id}.subtitle`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
