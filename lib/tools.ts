import type { Rich } from "./migraine-test";
import * as de from "./tool-copy/de";
import * as en from "./tool-copy/en";
import * as es from "./tool-copy/es";
import * as es419 from "./tool-copy/es-419";
import * as fr from "./tool-copy/fr";
import * as it from "./tool-copy/it";
import * as pt from "./tool-copy/pt";
import * as ptBR from "./tool-copy/pt-BR";

// Free tools exist in every site language. Their texts live in lib/tool-copy/,
// one module per language (French is the source).
export const TOOL_LOCALES = ["fr", "en", "de", "it", "es", "es-419", "pt", "pt-BR"] as const;
export type ToolLocale = (typeof TOOL_LOCALES)[number];
export function isToolLocale(locale: string): locale is ToolLocale {
  return (TOOL_LOCALES as readonly string[]).includes(locale);
}

type Faq = { q: string; a: string };

export type DiaryCopy = {
  path: string;
  navLabel: string;
  menuDescription: string;
  metaTitle: string;
  description: string;
  title: string;
  lead: string;
  downloads: Array<{ label: string; href: string; primary?: boolean }>;
  downloadNote: string;
  previewAlt: [string, string];
  whyTitle: string;
  why: Rich[];
  howTitle: string;
  steps: string[];
  doctorTitle: string;
  doctor: string[];
  appTitle: string;
  appText: string;
  faqTitle: string;
  faq: Faq[];
};

export type TestPageCopy = {
  path: string;
  navLabel: string;
  menuDescription: string;
  metaTitle: string;
  description: string;
  title: string;
  lead: string;
  howTitle: string;
  how: Rich[];
  faqTitle: string;
  faq: Faq[];
};

// A tool's path in every language, for the language switcher.
export function toolPaths(copy: Record<ToolLocale, { path: string }>) {
  return Object.fromEntries(TOOL_LOCALES.map((l) => [l, copy[l].path])) as Record<ToolLocale, string>;
}

// The menu's name for the tools (was "Resources").
export const TOOLS_LABEL: Record<ToolLocale, string> = {
  fr: "Outils gratuits",
  en: "Free tools",
  de: "Kostenlose Tools",
  it: "Strumenti gratuiti",
  es: "Herramientas gratis",
  "es-419": "Herramientas gratis",
  pt: "Ferramentas gratuitas",
  "pt-BR": "Ferramentas gratuitas",
};

export const ALL_TOOLS_LABEL: Record<ToolLocale, string> = {
  fr: "Tous les outils",
  en: "All tools",
  de: "Alle Tools",
  it: "Tutti gli strumenti",
  es: "Todas las herramientas",
  "es-419": "Todas las herramientas",
  pt: "Todas as ferramentas",
  "pt-BR": "Todas as ferramentas",
};

// Every language's texts, one module per language in lib/tool-copy/.
const COPY = { fr, en, de, it, es, "es-419": es419, pt, "pt-BR": ptBR };

function byLocale<T>(pick: (copy: (typeof COPY)[ToolLocale]) => T): Record<ToolLocale, T> {
  return Object.fromEntries(TOOL_LOCALES.map((l) => [l, pick(COPY[l])])) as Record<ToolLocale, T>;
}

export const DIARY = byLocale((c) => c.diary);
export const CYCLE_DIARY = byLocale((c) => c.cycleDiary);
export const TEST_PAGE = byLocale((c) => c.testPage);
export const TEST_COPY = byLocale((c) => c.test);
export const OVERUSE_PAGE = byLocale((c) => c.overusePage);
export const OVERUSE_COPY = byLocale((c) => c.overuse);

// Order of the tools menu and the footer links.
export function toolsMenu(locale: ToolLocale) {
  return [DIARY, CYCLE_DIARY, TEST_PAGE, OVERUSE_PAGE].map((copy) => copy[locale]);
}

// The page grouping all the tools, at the root of their folder
// (/ressources, /resources, /ressourcen…). Still to create.
export function toolsHubPath(locale: ToolLocale) {
  return `/${DIARY[locale].path.split("/")[1]}`;
}
