import { useLocale } from "next-intl";
import { AppRow } from "@/components/AppRow";
import { typographize } from "@/lib/typography";

type Props = {
  title: string;
  text: string;
  variant?: "inline" | "end";
};

// Usable in MDX:
//   <AppCta title="…" text="…" />  the app in one line between two rules
//                                  (AppRow), in the article's own words
// Every article also carries an <AppCta variant="end" />: it used to be a
// closing card and now shows nothing, the page ending instead with the
// site's download block (FinalCta), like every other page.
export function AppCta({ title, text, variant = "inline" }: Props) {
  const locale = useLocale();
  if (variant === "end") return null;
  return <AppRow className="my-10" title={typographize(title, locale)} text={typographize(text, locale)} />;
}
