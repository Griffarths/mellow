import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { typographize } from "@/lib/typography";
import { routing } from "./routing";

// French typography (non-breaking space before : ; ! ? and inside « »)
// for every message, as for the articles and tools; the JSON files stay
// plain.
function typographizeMessages(value: unknown, locale: string): unknown {
  if (typeof value === "string") return typographize(value, locale);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, v]) => [key, typographizeMessages(v, locale)]),
    );
  }
  return value;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages: typographizeMessages(messages, locale) as typeof messages,
  };
});
