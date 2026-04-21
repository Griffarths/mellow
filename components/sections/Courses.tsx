type Course = {
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  image: string;
};

const COURSES: Course[] = [
  {
    id: "understand",
    title: "Comprendre",
    subtitle: "Les mécanismes, les phases et ce qui se passe dans ton cerveau.",
    bg: "bg-[#F4C1D8]",
    image: "/assets/Comprendre3.svg",
  },
  {
    id: "prevent",
    title: "Prévenir",
    subtitle: "Routines, hygiène de vie et signaux d'alerte à reconnaître.",
    bg: "bg-[#BFD4EE]",
    image: "/assets/Prevenir.svg",
  },
  {
    id: "manage",
    title: "Gérer",
    subtitle: "Les méthodes qui marchent vraiment pendant la crise.",
    bg: "bg-[#F1C1A6]",
    image: "/assets/Gerer.svg",
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
            Tout ce qu&apos;il faut savoir sur la migraine, expliqué simplement.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <a
      href="#"
      className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[32px] p-8 transition hover:-translate-y-0.5 hover:shadow-soft md:rounded-[40px] md:p-10 ${course.bg}`}
    >
      <div className="flex items-center justify-center py-6 md:py-8">
        <img
          src={course.image}
          alt=""
          aria-hidden
          draggable={false}
          className="h-40 w-40 select-none md:h-48 md:w-48"
        />
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-black/60 md:text-base">
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

