// French typography puts a non-breaking space before : ; ! ? so the sign
// never starts a line. Applied at render time; article sources stay untouched.
export function typographize(text: string, locale: string): string {
  if (locale !== "fr") return text;
  return text.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ");
}

type MdNode = { type: string; value?: string; children?: MdNode[] };

// Remark plugin for the MDX articles: typographize every text node at
// render time (code and inline code are other node types, left alone).
export function remarkTypographize(locale: string) {
  return () => (tree: MdNode) => {
    const walk = (node: MdNode) => {
      if (node.type === "text" && node.value) node.value = typographize(node.value, locale);
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
