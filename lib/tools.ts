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

export const TOOLS_LABEL: Record<ToolLocale, string> = {
  fr: "Ressources",
  en: "Resources",
  de: "Ressourcen",
  it: "Risorse",
  es: "Recursos",
  "es-419": "Recursos",
  pt: "Recursos",
  "pt-BR": "Recursos",
};

// Every language's texts, one module per language in lib/tool-copy/.
const COPY = { fr, en, de, it, es, "es-419": es419, pt, "pt-BR": ptBR };

function byLocale<T>(pick: (copy: (typeof COPY)[ToolLocale]) => T): Record<ToolLocale, T> {
  return Object.fromEntries(TOOL_LOCALES.map((l) => [l, pick(COPY[l])])) as Record<ToolLocale, T>;
}

export const DIARY = byLocale((c) => c.diary);
export const TEST_PAGE = byLocale((c) => c.testPage);
export const TEST_COPY = byLocale((c) => c.test);
