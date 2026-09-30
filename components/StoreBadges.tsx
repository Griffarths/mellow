import { AppStoreButton } from "./AppStoreButton";
import { GooglePlayButton } from "./GooglePlayButton";

type Props = {
  className?: string;
  sizeClass?: string;
  align?: "center" | "start";
};

// 48px on mobile keeps both badges on one line at 375px wide (worst case:
// the French App Store badge next to Google Play).
const DEFAULT_SIZE = "h-12 w-auto select-none md:h-14";

export function StoreBadges({
  className = "",
  sizeClass = DEFAULT_SIZE,
  align = "center",
}: Props) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      <AppStoreButton sizeClass={sizeClass} />
      <GooglePlayButton sizeClass={sizeClass} />
    </div>
  );
}
