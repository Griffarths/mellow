import type { ComponentPropsWithoutRef, JSX } from "react";

type Props<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

export const mdxComponents = {
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
  p: (props: Props<"p">) => (
    <p className="mt-5 text-lg leading-[1.8] text-black/75" {...props} />
  ),
  ul: (props: Props<"ul">) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-lg leading-[1.8] text-black/75 marker:text-black/30"
      {...props}
    />
  ),
  ol: (props: Props<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-[1.8] text-black/75 marker:text-black/40"
      {...props}
    />
  ),
  li: (props: Props<"li">) => <li {...props} />,
  blockquote: (props: Props<"blockquote">) => (
    <blockquote
      className="mt-8 rounded-r-2xl border-l-4 border-mellow-rose bg-mellow-pink/30 px-6 py-4 text-lg italic leading-relaxed text-black/80"
      {...props}
    />
  ),
  code: (props: Props<"code">) => (
    <code
      className="rounded-md bg-cloud px-1.5 py-0.5 text-[0.95em] text-black/85"
      {...props}
    />
  ),
  pre: (props: Props<"pre">) => (
    <pre
      className="mt-6 overflow-x-auto rounded-2xl bg-ink p-5 text-sm text-white"
      {...props}
    />
  ),
  a: (props: Props<"a">) => (
    <a
      className="text-mellow-rose underline-offset-2 hover:underline"
      {...props}
    />
  ),
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (props: Props<"img">) => (
    <img className="mt-8 rounded-2xl" loading="lazy" {...props} />
  ),
  hr: (props: Props<"hr">) => (
    <hr className="my-12 border-black/10" {...props} />
  ),
};
