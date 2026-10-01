import type { Metadata } from "next";
import {
  CYCLE_DIARY,
  DIARY,
  OVERUSE_PAGE,
  TEST_PAGE,
  TOOL_LOCALES,
  type DiaryCopy,
  type ToolLocale,
} from "./tools";
import { HREFLANG, OG_LOCALE } from "./blog";
import { versioned } from "./diary-assets";

const SITE_URL = "https://mellowmigraine.com";

export const TOOL_IDS = ["diary", "cycleDiary", "test", "overuse"] as const;
export type ToolId = (typeof TOOL_IDS)[number];
const COPY = { diary: DIARY, cycleDiary: CYCLE_DIARY, test: TEST_PAGE, overuse: OVERUSE_PAGE };

// Printable diaries: their PDF copy and the prefix of their PNG previews.
const DIARIES: Partial<Record<ToolId, { copy: Record<ToolLocale, DiaryCopy>; preview: string }>> = {
  diary: { copy: DIARY, preview: "diary" },
  cycleDiary: { copy: CYCLE_DIARY, preview: "cycle" },
};

// Page 2 is the same attack log in both diaries: one image serves both.
export function previewUrl(tool: ToolId, locale: ToolLocale, page: 1 | 2) {
  const prefix = page === 2 ? "diary" : DIARIES[tool]?.preview;
  return versioned(`/tools/${prefix}-${locale}-p${page}.png`);
}

export function toolUrl(tool: ToolId, locale: ToolLocale) {
  const path = COPY[tool][locale].path;
  return locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
}

// hreflang → URL for every language version of a tool, plus x-default.
export function toolAlternates(tool: ToolId): Record<string, string> {
  return {
    ...Object.fromEntries(TOOL_LOCALES.map((l) => [HREFLANG[l], toolUrl(tool, l)])),
    "x-default": toolUrl(tool, "en"),
  };
}

export function toolMetadata(tool: ToolId, locale: ToolLocale): Metadata {
  const c = COPY[tool][locale];
  const url = toolUrl(tool, locale);
  return {
    title: `${c.metaTitle} · Mellow`,
    description: c.description,
    alternates: {
      canonical: url,
      languages: toolAlternates(tool),
    },
    openGraph: {
      type: "website",
      title: c.metaTitle,
      description: c.description,
      url,
      locale: OG_LOCALE[locale],
      images: DIARIES[tool] ? [{ url: `${SITE_URL}${previewUrl(tool, locale, 1)}` }] : undefined,
    },
  };
}

export function toolJsonLd(tool: ToolId, locale: ToolLocale) {
  const c = COPY[tool][locale];
  const faq = {
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const diary = DIARIES[tool];
  if (!diary) {
    return { "@context": "https://schema.org", "@graph": [faq] };
  }
  const d = diary.copy[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: d.howTitle,
        description: d.lead,
        image: `${SITE_URL}${previewUrl(tool, locale, 1)}`,
        supply: d.downloads.map((x) => ({ "@type": "HowToSupply", name: `${SITE_URL}${versioned(x.href)}` })),
        step: d.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
      },
      faq,
    ],
  };
}
