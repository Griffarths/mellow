import type { CSSProperties } from "react";

// Port of HeroCloudShape from the iOS app (HomeView.swift): five bumps drawn
// in a 393 × 124 pt frame. One silhouette spans the full width; past
// `maxHeight` it widens instead of growing taller, so the bumps stretch
// horizontally on large screens.
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
const RATIO_VW = (TILE_H / TILE_W) * 100;

type Props = {
  className?: string;
  flip?: boolean;
  maxHeight?: number;
  style?: CSSProperties;
};

export function cloudHeight(maxHeight = 300) {
  return `min(${RATIO_VW.toFixed(2)}vw, ${maxHeight}px)`;
}

export function Clouds({
  className = "",
  flip = false,
  maxHeight = 300,
  style,
}: Props) {
  return (
    <div
      aria-hidden
      style={style}
      className={`pointer-events-none text-white ${flip ? "-scale-y-100" : ""} ${className}`}
    >
      <svg
        viewBox={`${ORIGIN_X} 0 ${TILE_W} ${TILE_H}`}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: cloudHeight(maxHeight) }}
        fill="currentColor"
        focusable="false"
      >
        <rect x={ORIGIN_X} y="120" width={TILE_W} height={TILE_H - 120} />
        {BUMPS.map(([cx, cy, r]) => (
          <circle key={cx} cx={cx} cy={cy} r={r} />
        ))}
      </svg>
    </div>
  );
}
