export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <LogoMark />
          <span>Mellow</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-black/60 md:flex">
          <a href="#features" className="transition hover:text-black">
            Fonctionnalités
          </a>
          <a href="#screens" className="transition hover:text-black">
            L&apos;app
          </a>
        </nav>
        <a
          href="#download"
          className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85"
        >
          Télécharger
        </a>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid h-7 w-7 place-items-center rounded-[10px] bg-mellow-pink"
    >
      <span className="h-2 w-2 rounded-full bg-mellow-rose" />
    </span>
  );
}
