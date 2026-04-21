type Props = {
  variant?: "dark" | "light";
  className?: string;
};

export function AppStoreButton({ variant = "dark", className = "" }: Props) {
  const isDark = variant === "dark";
  return (
    <a
      href="#"
      aria-label="Télécharger sur l'App Store"
      className={`inline-flex items-center gap-3 rounded-2xl px-5 py-3 transition ${
        isDark
          ? "bg-ink text-white hover:bg-black/85"
          : "bg-white text-ink ring-1 ring-black/10 hover:bg-cloud"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M17.05 12.81c-.03-2.98 2.43-4.42 2.54-4.49-1.39-2.03-3.55-2.31-4.32-2.34-1.84-.19-3.59 1.08-4.52 1.08-.94 0-2.38-1.06-3.92-1.03-2.02.03-3.88 1.17-4.92 2.97-2.1 3.64-.54 9.04 1.51 12 1.01 1.45 2.21 3.08 3.78 3.02 1.52-.06 2.1-.98 3.93-.98 1.83 0 2.35.98 3.95.95 1.63-.03 2.66-1.48 3.66-2.94 1.15-1.69 1.63-3.33 1.66-3.41-.04-.02-3.19-1.22-3.22-4.83zM14.02 4.38c.83-1 1.39-2.39 1.23-3.77-1.19.05-2.63.79-3.48 1.79-.77.88-1.44 2.29-1.26 3.64 1.32.1 2.67-.67 3.51-1.66z" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide opacity-70">
          Disponible sur
        </span>
        <span className="text-lg font-semibold">App Store</span>
      </span>
    </a>
  );
}
