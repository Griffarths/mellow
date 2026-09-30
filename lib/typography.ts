// French typography puts a non-breaking space before : ; ! ? so the sign
// never starts a line. Applied at render time; article sources stay untouched.
export function typographize(text: string, locale: string): string {
  if (locale !== "fr") return text;
  return text.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ");
}
