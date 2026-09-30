import hashes from "./diary-assets.json";

// Appends the content hash written by scripts/diary/build.mjs.
export function versioned(path: string): string {
  const hash = (hashes as Record<string, string>)[path];
  return hash ? `${path}?v=${hash}` : path;
}
