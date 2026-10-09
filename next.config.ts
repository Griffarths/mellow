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
    // The three blog pillars (Understand, Prevent, Manage) became six categories
    // on 2026-10-09: each old pillar page points to the closest category.
    const pillars: Array<[string, string]> = [
      ["/fr/blog/comprendre-la-migraine", "/fr/blog/symptomes-migraine"],
      ["/blog/understanding-migraine", "/blog/migraine-symptoms"],
      ["/es/blog/comprender-migrana", "/es/blog/sintomas-migrana"],
      ["/es-419/blog/comprender-migrana", "/es-419/blog/sintomas-migrana"],
      ["/de/blog/migraene-verstehen", "/de/blog/migraene-symptome"],
      ["/it/blog/capire-emicrania", "/it/blog/sintomi-emicrania"],
      ["/pt/blog/compreender-enxaqueca", "/pt/blog/sintomas-enxaqueca"],
      ["/pt-BR/blog/entender-enxaqueca", "/pt-BR/blog/sintomas-enxaqueca"],
      ["/fr/blog/prevenir-la-migraine", "/fr/blog/declencheurs-migraine"],
      ["/blog/migraine-prevention", "/blog/migraine-triggers"],
      ["/es/blog/prevenir-migrana", "/es/blog/desencadenantes-migrana"],
      ["/es-419/blog/prevenir-migrana", "/es-419/blog/desencadenantes-migrana"],
      ["/de/blog/migraene-vorbeugen", "/de/blog/migraene-ausloeser"],
      ["/it/blog/prevenire-emicrania", "/it/blog/emicrania-fattori-scatenanti"],
      ["/pt/blog/prevenir-enxaqueca", "/pt/blog/desencadeantes-enxaqueca"],
      ["/pt-BR/blog/prevenir-enxaqueca", "/pt-BR/blog/gatilhos-enxaqueca"],
      ["/fr/blog/gerer-la-migraine", "/fr/blog/traitements-migraine"],
      ["/blog/managing-migraine", "/blog/migraine-treatments"],
      ["/es/blog/gestionar-migrana", "/es/blog/tratamientos-migrana"],
      ["/es-419/blog/manejar-migrana", "/es-419/blog/tratamientos-migrana"],
      ["/de/blog/migraene-bewaeltigen", "/de/blog/migraene-behandlung"],
      ["/it/blog/gestire-emicrania", "/it/blog/trattamenti-emicrania"],
      ["/pt/blog/gerir-enxaqueca", "/pt/blog/tratamentos-enxaqueca"],
      ["/pt-BR/blog/gerenciar-enxaqueca", "/pt-BR/blog/tratamentos-enxaqueca"],
    ];
    return [...moved, ...pillars].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default withNextIntl(nextConfig);
