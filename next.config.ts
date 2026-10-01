import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Next externalizes next-mdx-remote by default, so it would load React from
  // node_modules instead of Next's bundled React. In dev the elements it
  // creates then lack the debug fields Next's React expects and article pages
  // hang with a 500. Bundling it keeps a single React.
  transpilePackages: ["next-mdx-remote"],

  // The free tools moved from /fr/outils and /tools to /fr/ressources and
  // /resources on 2026-10-01. The old URLs were already public: keep them
  // working (301) for shared links and search engines.
  async redirects() {
    const moved: Array<[string, string]> = [
      ["/fr/outils/journal-de-migraine", "/fr/ressources/journal-de-migraine"],
      ["/fr/outils/test-migraine", "/fr/ressources/test-migraine"],
      ["/tools/migraine-diary", "/resources/migraine-diary"],
      ["/tools/migraine-test", "/resources/migraine-test"],
      ["/en/tools/migraine-diary", "/resources/migraine-diary"],
      ["/en/tools/migraine-test", "/resources/migraine-test"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
