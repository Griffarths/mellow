import type { Metadata } from "next";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { QrWidget } from "@/components/QrWidget";
import { ScrollReset } from "@/components/ScrollReset";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { routing } from "@/i18n/routing";
import { APP_STORE_ID } from "@/lib/stores";
import "../globals.css";

// Plus Jakarta Sans served from the site itself (app/fonts, OFL licence): the build no
// longer downloads it from Google Fonts, which sometimes failed and cancelled a deployment.
// Variable font (weights 200 to 800), split like Google serves it: Latin (preloaded) and
// Latin Extended (accents of other European languages, loaded only when a page needs them).
const jakarta = localFont({
  src: "../fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" }],
});
const jakartaExt = localFont({
  src: "../fonts/plus-jakarta-sans-latin-ext-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-jakarta-ext",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF" }],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
    },
    // iOS Smart App Banner: <meta name="apple-itunes-app" content="app-id=…">
    itunes: { appId: APP_STORE_ID },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${jakarta.variable} ${jakartaExt.variable}`}>
      {/* Browser extensions (ColorZilla, Grammarly…) add attributes to <body>
          before React loads: not a real mismatch. */}
      <body className="bg-white font-sans text-ink antialiased" suppressHydrationWarning>
        <NextIntlClientProvider>
          <ScrollReset />
          {children}
          <QrWidget />
        </NextIntlClientProvider>
        <SiteAnalytics />
      </body>
    </html>
  );
}
