import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "onTint";

const BASE =
  "inline-flex h-[54px] items-center justify-center gap-2 rounded-btn px-6 text-base font-semibold transition active:scale-[0.98] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-hot";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink/85",
  secondary: "bg-surface-soft text-ink hover:bg-surface-line",
  onTint: "bg-white text-ink hover:bg-white/75",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${BASE} ${VARIANTS[variant]} ${className}`;
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: Props) {
  const cls = buttonClass(variant, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
