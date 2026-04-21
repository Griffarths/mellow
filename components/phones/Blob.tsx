type Props = {
  color?: string;
  className?: string;
  smile?: boolean;
};

export function Blob({ color = "#F8C8CC", className = "", smile = true }: Props) {
  return (
    <svg
      viewBox="0 0 200 180"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M100 8c32 0 66 18 76 48 10 30-6 64-30 82-24 18-54 24-82 14C36 142 14 120 8 90 2 60 20 32 48 18 62 11 80 8 100 8Z"
      />
      {smile && (
        <g
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M70 70c3 8 9 12 14 12s11-4 14-12" />
          <path d="M110 70c3 8 9 12 14 12s11-4 14-12" />
          <path d="M72 105c10 12 36 12 56 0" />
        </g>
      )}
    </svg>
  );
}
