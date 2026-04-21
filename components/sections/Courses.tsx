type Course = {
  label: string;
  title: string;
  subtitle: string;
  bg: string;
  illustration: React.ReactNode;
};

const BIG: Course = {
  label: "Comprendre",
  title: "Qu'est-ce que la migraine ?",
  subtitle:
    "Les mécanismes, les phases et ce qui se passe vraiment dans ton cerveau.",
  bg: "bg-[#FDECEF]",
  illustration: <BrainIllus />,
};

const SMALL: Course[] = [
  {
    label: "Prévenir",
    title: "Comment éviter une migraine ?",
    subtitle: "Routines, hygiène de vie et signaux d'alerte.",
    bg: "bg-[#E6EEFB]",
    illustration: <ShieldIllus />,
  },
  {
    label: "Gérer",
    title: "Comment soulager une migraine ?",
    subtitle: "Les méthodes qui marchent vraiment pendant la crise.",
    bg: "bg-[#FDE2D1]",
    illustration: <IcePackIllus />,
  },
];

export function Courses() {
  return (
    <section id="courses" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="section-title text-4xl font-bold md:text-6xl">
            Apprends à mieux vivre avec la migraine.
          </h2>
          <p className="mt-4 text-lg text-black/60 md:text-xl">
            Des cours courts, écrits avec des spécialistes, pour t&apos;aider au
            quotidien.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16">
          <CourseCard course={BIG} size="big" />
          <div className="grid gap-4 sm:grid-cols-2">
            {SMALL.map((c) => (
              <CourseCard key={c.label} course={c} size="small" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  course,
  size,
}: {
  course: Course;
  size: "big" | "small";
}) {
  const isBig = size === "big";
  return (
    <a
      href="#"
      className={`group relative flex overflow-hidden rounded-[32px] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-soft ${
        course.bg
      } ${isBig ? "min-h-[260px] flex-col md:min-h-[320px] md:flex-row" : "min-h-[260px] flex-col"}`}
    >
      <div
        className={`relative flex items-center justify-center p-8 ${
          isBig ? "md:w-1/2 md:p-12" : "p-6"
        }`}
      >
        <div className={isBig ? "h-40 w-40 md:h-48 md:w-48" : "h-28 w-28"}>
          {course.illustration}
        </div>
      </div>
      <div
        className={`flex flex-1 flex-col justify-end p-8 ${
          isBig ? "md:p-12" : "p-6"
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          {course.label}
        </span>
        <h3
          className={`mt-2 font-bold tracking-tight ${
            isBig ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {course.title}
        </h3>
        <p className={`mt-2 text-black/60 ${isBig ? "text-base md:text-lg" : "text-sm"}`}>
          {course.subtitle}
        </p>
      </div>
      <div className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink transition group-hover:bg-white">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M7 17 17 7M8 7h9v9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}

function BrainIllus() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <path
        d="M100 22c28 0 52 16 52 46 0 10-4 18-10 24 6 6 8 14 8 22 0 22-20 40-50 40-28 0-52-16-52-46 0-10 4-18 10-24-6-6-8-14-8-22 0-22 20-40 50-40z"
        fill="#F8C8CC"
      />
      <path
        d="M74 80c0-12 10-22 22-22M82 110c0-10 8-18 18-18M90 140c0-8 6-14 14-14M118 80c6 4 10 12 10 20M122 112c6 4 10 12 10 20"
        stroke="#0A0A0A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="78" cy="72" r="4" fill="#0A0A0A" />
      <circle cx="126" cy="72" r="4" fill="#0A0A0A" />
      <path
        d="M88 128c6 6 18 6 24 0"
        stroke="#0A0A0A"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIllus() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <path
        d="M100 24 48 44v48c0 34 22 62 52 76 30-14 52-42 52-76V44L100 24z"
        fill="#BFD4EE"
      />
      <path
        d="M70 100l22 22 42-44"
        stroke="#0A0A0A"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IcePackIllus() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <rect x="36" y="52" width="128" height="96" rx="24" fill="#F8B68A" />
      <path
        d="M100 72v56M72 100h56M82 82l36 36M118 82l-36 36"
        stroke="#0A0A0A"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
