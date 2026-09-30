import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Next externalizes next-mdx-remote by default, so it would load React from
  // node_modules instead of Next's bundled React. In dev the elements it
  // creates then lack the debug fields Next's React expects and article pages
  // hang with a 500. Bundling it keeps a single React.
  transpilePackages: ["next-mdx-remote"],
};

export default withNextIntl(nextConfig);
