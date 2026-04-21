export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <img
            src="/blobs/Fleur1.svg"
            alt=""
            aria-hidden
            className="h-9 w-9 select-none"
            draggable={false}
          />
          <span>Mellow</span>
        </a>
        <a
          href="#download"
          aria-label="Télécharger dans l'App Store"
          className="transition hover:opacity-85"
        >
          <img
            src="/app-store/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg"
            alt="Télécharger dans l'App Store"
            className="h-10 w-auto select-none"
            draggable={false}
          />
        </a>
      </div>
    </header>
  );
}
