import type { Metadata } from "next";
import { DIARY, TEST_PAGE, type ToolLocale } from "./tools";
import { versioned } from "./diary-assets";

const SITE_URL = "https://mellowmigraine.com";

export type ToolId = "diary" | "test";
const COPY = { diary: DIARY, test: TEST_PAGE };

export function toolUrl(tool: ToolId, locale: ToolLocale) {
  const path = COPY[tool][locale].path;
  return locale === "en" ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
}

export function toolMetadata(tool: ToolId, locale: ToolLocale): Metadata {
  const c = COPY[tool][locale];
  const url = toolUrl(tool, locale);
  return {
    title: `${c.metaTitle} · Mellow`,
    description: c.description,
    alternates: {
      canonical: url,
      languages: { "fr-FR": toolUrl(tool, "fr"), en: toolUrl(tool, "en") },
    },
    openGraph: {
      type: "website",
      title: c.metaTitle,
      description: c.description,
      url,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: tool === "diary" ? [{ url: `${SITE_URL}${versioned(`/tools/diary-${locale}-p1.png`)}` }] : undefined,
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
  if (tool === "test") {
    return { "@context": "https://schema.org", "@graph": [faq] };
  }
  const d = DIARY[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: d.howTitle,
        description: d.lead,
        image: `${SITE_URL}${versioned(`/tools/diary-${locale}-p1.png`)}`,
        supply: d.downloads.map((x) => ({ "@type": "HowToSupply", name: `${SITE_URL}${versioned(x.href)}` })),
        step: d.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
      },
      faq,
    ],
  };
}
