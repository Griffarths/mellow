// Port of HeroCloudShape from the iOS app (HomeView.swift): five bumps from the
// app's SVG, one tile = 393 × 124 pt. The tile tiles seamlessly, so wide
// screens repeat it instead of stretching the circles. An odd tile count keeps
// the lowest bump (the valley) centred, where the mascot sits.
const TILE_W = 393;
const TILE_H = 124;
const ORIGIN_X = 66.2209;
const BUMPS: ReadonlyArray<readonly [number, number, number]> = [
  [66.2209, 66.2209, 66.2209],
  [166.277, 116.008, 67.671],
  [265.85, 142.109, 67.671],
  [375.091, 114.074, 67.671],
  [456.779, 66.2209, 66.2209],
];

function Silhouette({ tiles, className }: { tiles: number; className: string }) {
  const width = TILE_W * tiles;
  return (
    <svg
      viewBox={`0 0 ${width} ${TILE_H}`}
      className={`block h-auto w-full ${className}`}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <rect x="0" y="120" width={width} height={TILE_H - 120} />
      {Array.from({ length: tiles }, (_, i) =>
        BUMPS.map(([cx, cy, r]) => (
          <circle
            key={`${i}-${cx}`}
            cx={cx - ORIGIN_X + i * TILE_W}
            cy={cy}
            r={r}
          />
        )),
      )}
    </svg>
  );
}

type Props = {
  className?: string;
  flip?: boolean;
};

export function Clouds({ className = "", flip = false }: Props) {
  return (
    <div
      className={`pointer-events-none text-white ${flip ? "-scale-y-100" : ""} ${className}`}
    >
      <Silhouette tiles={1} className="md:hidden" />
      <Silhouette tiles={3} className="hidden md:block" />
    </div>
  );
}
