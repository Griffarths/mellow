"use client";

import { useEffect, useState } from "react";

// The compact download button of the navbar, where the store badges do not
// fit (phones and tablets): Google Play on Android, the App Store elsewhere.
// The device is read after mount so the server and first client render match.
export function DownloadButton({
  label,
  appStoreUrl,
  playStoreUrl,
  className = "",
}: {
  label: string;
  appStoreUrl: string;
  playStoreUrl: string;
  className?: string;
}) {
  const [isAndroid, setIsAndroid] = useState(false);
  useEffect(() => {
    setIsAndroid(/android/i.test(navigator.userAgent));
  }, []);

  return (
    <a
      href={isAndroid ? playStoreUrl : appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`nav-cta inline-flex h-9 items-center whitespace-nowrap rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/85 ${className}`}
    >
      {label}
    </a>
  );
}
