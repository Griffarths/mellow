import { Link } from "@/i18n/navigation";
import { TONES, type Tone } from "@/lib/tones";

type Props = {
  href: string;
  tone: Tone;
  title: string;
  subtitle: string;
};

// The app's home tile: tinted card, mascot cropped in the bottom-right corner,
// arrow in a white circle bottom-left.
export function Tile({ href, tone, title, subtitle }: Props) {
  const t = TONES[tone];
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[220px] flex-col gap-2 overflow-hidden rounded-card p-6 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink md:min-h-[260px] md:p-7 ${t.tint}`}
    >
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="max-w-[24ch] text-[15px] leading-snug text-ink-2">
        {subtitle}
      </p>
      <img
        src={t.mascot}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -bottom-6 -right-5 h-32 w-32 select-none transition-transform duration-300 group-hover:-rotate-6 md:h-36 md:w-36"
      />
      <span
        aria-hidden
        className={`absolute bottom-5 left-5 grid h-10 w-10 place-items-center rounded-full bg-white md:bottom-6 md:left-6 ${t.accent}`}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}
