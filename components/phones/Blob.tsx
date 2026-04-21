type BlobName =
  | "Fleur1"
  | "Fleur3"
  | "Croix1"
  | "Croix2"
  | "Tagada1"
  | "Tagada2"
  | "Trio";

type Props = {
  name: BlobName;
  className?: string;
  alt?: string;
};

export function Blob({ name, className = "", alt = "" }: Props) {
  return (
    <img
      src={`/blobs/${name}.svg`}
      alt={alt}
      aria-hidden={alt === ""}
      draggable={false}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
