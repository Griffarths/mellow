"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/Button";

// Reads the address in the browser only (no server call, nothing stored):
// with ?error=…, the refusal and TikTok's description; otherwise the full
// address in a read-only field, with a button to copy it.
export function TiktokAuth() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<{ description: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("error")) setError({ description: params.get("error_description") ?? "" });
    setUrl(window.location.href);
  }, []);

  const copy = async (field: HTMLInputElement | null) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // No clipboard access: select the address so it can be copied by hand.
      field?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <img
        src="/blobs/Fleur1.svg"
        alt=""
        aria-hidden
        width={462}
        height={500}
        draggable={false}
        className="mx-auto h-auto w-16 select-none md:w-20"
      />
      {error ? (
        <>
          <h1 className="mt-8 text-balance text-h2 text-ink">Autorisation refusée</h1>
          {error.description && (
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-body md:text-lg">{error.description}</p>
          )}
        </>
      ) : (
        <>
          <h1 className="mt-8 text-balance text-h2 text-ink">Connexion TikTok</h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-ink-body md:text-lg">
            Copie cette adresse et colle-la dans Carousel Studio.
          </p>
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              copy(e.currentTarget.elements.namedItem("tiktok-url") as HTMLInputElement | null);
            }}
          >
            <label htmlFor="tiktok-url" className="sr-only">
              Adresse de la page
            </label>
            <input
              id="tiktok-url"
              name="tiktok-url"
              type="text"
              readOnly
              value={url}
              onFocus={(e) => e.currentTarget.select()}
              className="h-[54px] w-full min-w-0 rounded-btn border border-surface-line bg-white px-4 text-left text-sm text-ink-2 outline-none focus:border-ink-3 sm:w-auto sm:flex-1"
            />
            <button
              type="submit"
              disabled={!url}
              className={buttonClass("primary", "disabled:opacity-50")}
            >
              {copied ? "Copié" : "Copier"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
