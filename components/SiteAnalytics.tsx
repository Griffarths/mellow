"use client";

import { Analytics } from "@vercel/analytics/next";

// Vercel Web Analytics, without the TikTok sign-in page: its address carries
// TikTok's authorization code (?code=…), which must not be recorded anywhere.
export function SiteAnalytics() {
  return <Analytics beforeSend={(event) => (new URL(event.url).pathname.endsWith("/tiktok-auth") ? null : event)} />;
}
