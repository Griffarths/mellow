type Props = {
  className?: string;
};

export function AppStoreButton({ className = "" }: Props) {
  return (
    <a
      href="#"
      aria-label="Télécharger dans l'App Store"
      className={`inline-block transition hover:opacity-85 ${className}`}
    >
      <img
        src="/app-store/Download_on_the_App_Store_Badge_FR_RGB_blk_100517.svg"
        alt="Télécharger dans l'App Store"
        className="h-14 w-auto select-none md:h-16"
        draggable={false}
      />
    </a>
  );
}
