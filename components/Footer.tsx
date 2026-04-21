export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-black/50 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid h-6 w-6 place-items-center rounded-md bg-mellow-pink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mellow-rose" />
          </span>
          <span className="font-semibold text-black/80">Mellow</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-black">
            Confidentialité
          </a>
          <a href="#" className="hover:text-black">
            Conditions
          </a>
          <a href="mailto:hello@mellow.app" className="hover:text-black">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
