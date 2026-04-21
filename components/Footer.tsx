import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-black/50 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/blobs/Fleur1.svg"
            alt=""
            aria-hidden
            className="h-7 w-7 select-none"
            draggable={false}
          />
          <span className="font-semibold text-black/80">Mellow</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/confidentialite" className="hover:text-black">
            Confidentialité
          </Link>
          <a href="#" className="hover:text-black">
            Conditions
          </a>
          <Link href="/mentions-legales" className="hover:text-black">
            Mentions légales
          </Link>
          <a href="mailto:contact.mellow@proton.me" className="hover:text-black">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
