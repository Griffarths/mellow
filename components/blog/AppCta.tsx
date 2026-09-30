import { useLocale } from "next-intl";
import { StoreBadges } from "@/components/StoreBadges";
import { typographize } from "@/lib/typography";
import { BlogCta } from "./BlogCta";

type Props = {
  title: string;
  text: string;
  variant?: "inline" | "end";
};

// Usable in MDX:
//   <AppCta title="…" text="…" />               compact card mid-article
//   <AppCta variant="end" title="…" text="…" /> closing block before sources
export function AppCta({ title, text, variant = "inline" }: Props) {
  const locale = useLocale();
  const t = typographize(title, locale);
  const x = typographize(text, locale);

  if (variant === "end") return <BlogCta title={t} text={x} />;

  return (
    <aside className="relative my-10 overflow-hidden rounded-card bg-tagada-tint p-6 pr-6 md:p-7 md:pr-40">
      <p className="text-[19px] font-bold leading-snug tracking-tight text-ink md:text-xl">
        {t}
      </p>
      <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-2 md:text-base">
        {x}
      </p>
      <StoreBadges
        align="start"
        className="relative z-10 mt-5 gap-2"
        sizeClass="h-10 w-auto select-none"
      />
      <img
        src="/blobs/Tagada1.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -bottom-6 -right-4 hidden h-32 w-32 select-none md:block"
      />
    </aside>
  );
}
