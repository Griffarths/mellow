import type { ComponentPropsWithoutRef, JSX } from "react";

type Props<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

export const mdxComponents = {
  // Headings
  h2: (props: Props<"h2">) => (
    <h2
      className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl"
      {...props}
    />
  ),
  h3: (props: Props<"h3">) => (
    <h3
      className="mt-10 scroll-mt-24 text-2xl font-bold tracking-tight md:text-3xl"
      {...props}
    />
  ),

  // Body
  p: (props: Props<"p">) => (
    <p className="my-5 text-lg leading-[1.8] text-black/75" {...props} />
  ),

  strong: (props: Props<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  em: (props: Props<"em">) => <em className="italic" {...props} />,

  // Lists — force display: list-item on children to defeat any preflight reset
  ul: (props: Props<"ul">) => (
    <ul
      className="my-6 list-disc space-y-2 pl-6 text-lg leading-[1.8] text-black/75 marker:text-mellow-rose [&>li]:list-item"
      {...props}
    />
  ),
  ol: (props: Props<"ol">) => (
    <ol
      className="my-6 list-decimal space-y-2 pl-6 text-lg leading-[1.8] text-black/75 marker:font-semibold marker:text-black/60 [&>li]:list-item"
      {...props}
    />
  ),
  li: (props: Props<"li">) => (
    <li className="pl-2 [&>p]:my-0" {...props} />
  ),

  // Quote
  blockquote: (props: Props<"blockquote">) => (
    <blockquote
      className="my-8 rounded-r-2xl border-l-4 border-mellow-rose bg-mellow-pink/30 px-6 py-4 text-lg italic leading-relaxed text-black/80 [&>p]:my-0"
      {...props}
    />
  ),

  // Code
  code: (props: Props<"code">) => (
    <code
      className="rounded-md bg-cloud px-1.5 py-0.5 text-[0.95em] text-ink"
      {...props}
    />
  ),
  pre: (props: Props<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-2xl bg-ink p-5 text-sm text-white"
      {...props}
    />
  ),

  // Links
  a: (props: Props<"a">) => (
    <a
      className="text-mellow-rose underline-offset-2 hover:underline"
      {...props}
    />
  ),

  // Media
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (props: Props<"img">) => (
    <img className="my-8 rounded-2xl" loading="lazy" {...props} />
  ),

  hr: (props: Props<"hr">) => (
    <hr className="my-12 border-black/10" {...props} />
  ),

  // Tables (remark-gfm) — wrap in a horizontal-scroll container, rounded
  // ring around the whole thing, tinted header, alternating body rows.
  table: (props: Props<"table">) => (
    <div className="my-8 overflow-x-auto rounded-2xl ring-1 ring-black/10">
      <table
        className="w-full border-collapse text-left text-sm md:text-base"
        {...props}
      />
    </div>
  ),
  thead: (props: Props<"thead">) => (
    <thead className="bg-black/[0.03]" {...props} />
  ),
  tbody: (props: Props<"tbody">) => <tbody {...props} />,
  tr: (props: Props<"tr">) => (
    <tr
      className="border-t border-black/10 first:border-t-0 even:bg-black/[0.02]"
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
      className="px-4 py-3 align-top text-black/75 [&>p]:my-0"
      {...props}
    />
  ),
};
