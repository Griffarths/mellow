// One tone per Mellow, as in the app: tile background = mascot colour at low
// opacity, accent = darker shade used for the arrow.
export type Tone = "fleur" | "tagada" | "croix" | "sable";

export const TONES: Record<
  Tone,
  { tint: string; accent: string; mascot: string }
> = {
  fleur: {
    tint: "bg-fleur-tint",
    accent: "text-fleur-accent",
    mascot: "/blobs/Fleur1.svg",
  },
  tagada: {
    tint: "bg-tagada-tint",
    accent: "text-tagada-accent",
    mascot: "/blobs/Tagada1.svg",
  },
  croix: {
    tint: "bg-croix-tint",
    accent: "text-croix-accent",
    mascot: "/blobs/Croix1.svg",
  },
  sable: {
    tint: "bg-sable-tint",
    accent: "text-sable-accent",
    mascot: "/blobs/Humeur1.svg",
  },
};

export function toneForImage(src: string): Tone {
  if (src.includes("Croix")) return "croix";
  if (src.includes("Tagada")) return "tagada";
  if (src.includes("Humeur")) return "sable";
  return "fleur";
}
