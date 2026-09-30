import type { ComponentPropsWithoutRef, JSX } from "react";

type Props<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

export const mdxComponents = {
  // Headings
  h2: (props: Props<"h2">) => (
    <h2
      className="mt-14 scroll-mt-24 text-[26px] font-extrabold leading-tight tracking-tight text-ink md:text-[32px]"
      {...props}
    />
  ),
  h3: (props: Props<"h3">) => (
    <h3
      className="mt-10 scroll-mt-24 text-[21px] font-bold leading-snug tracking-tight text-ink md:text-2xl"
      {...props}
    />
  ),

  // Body
  p: (props: Props<"p">) => (
    <p className="my-5 text-[17px] leading-[1.8] text-ink-body md:text-lg" {...props} />
  ),

  strong: (props: Props<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  em: (props: Props<"em">) => <em className="italic" {...props} />,

  // Lists — force display: list-item on children to defeat any preflight reset
  ul: (props: Props<"ul">) => (
    <ul
      className="my-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.8] text-ink-body marker:text-croix-accent md:text-lg [&>li]:list-item"
      {...props}
    />
  ),
  ol: (props: Props<"ol">) => (
    <ol
      className="my-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.8] text-ink-body marker:font-bold marker:text-croix-ink md:text-lg [&>li]:list-item"
      {...props}
    />
  ),
  li: (props: Props<"li">) => (
    <li className="pl-2 [&>p]:my-0" {...props} />
  ),

  // Quote
  blockquote: (props: Props<"blockquote">) => (
    <blockquote
      className="my-8 rounded-card bg-hero px-6 py-5 text-[17px] font-medium leading-relaxed text-ink md:px-7 md:text-lg [&>p]:my-0 [&>p]:text-ink"
      {...props}
    />
  ),

  // Code
  code: (props: Props<"code">) => (
    <code
      className="rounded-md bg-surface-soft px-1.5 py-0.5 text-[0.95em] text-ink"
      {...props}
    />
  ),
  pre: (props: Props<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-btn bg-ink p-5 text-sm text-white"
      {...props}
    />
  ),

  // Links
  a: (props: Props<"a">) => (
    <a
      className="font-semibold text-croix-ink underline decoration-croix-ink/30 decoration-2 underline-offset-[3px] transition hover:decoration-croix-ink"
      {...props}
    />
  ),

  // Media
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (props: Props<"img">) => (
    <img className="my-8 rounded-card" loading="lazy" {...props} />
  ),

  hr: (props: Props<"hr">) => (
    <hr className="my-12 border-surface-line" {...props} />
  ),

  // Tables (remark-gfm) — wrap in a horizontal-scroll container, rounded
  // ring around the whole thing, tinted header, alternating body rows.
  table: (props: Props<"table">) => (
    <div className="my-8 overflow-x-auto rounded-card ring-1 ring-surface-line">
      <table
        className="w-full border-collapse text-left text-sm md:text-base"
        {...props}
      />
    </div>
  ),
  thead: (props: Props<"thead">) => (
    <thead className="bg-surface-grouped" {...props} />
  ),
  tbody: (props: Props<"tbody">) => <tbody {...props} />,
  tr: (props: Props<"tr">) => (
    <tr
      className="border-t border-surface-line first:border-t-0 even:bg-surface-soft/60"
      {...props}
    />
  ),
  th: (props: Props<"th">) => (
    <th
      className="px-4 py-3 align-bottom text-sm font-semibold text-ink md:text-base"
      {...props}
    />
  ),
  td: (props: Props<"td">) => (
    <td
      className="px-4 py-3 align-top text-ink-body [&>p]:my-0"
      {...props}
    />
  ),
};
