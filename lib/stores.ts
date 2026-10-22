export const APP_STORE_ID = "6762257609";

// Store campaign links, so that Metrics Studio can tell where installs come
// from. "site": the site's own buttons (navbar, mobile menu, footer, QR code,
// home, the app and doctor pages, the tools), on every page, the blog's
// included. "blog": the buttons that belong to the blog (the app rows in
// articles, the final block of the articles, of the blog's home and of its
// categories). /download keeps its own "tiktok" link.
export type StoreCampaign = "site" | "blog";

// App Store: App Store Connect campaigns (ct=…).
export const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6762257609?pt=128563123&ct=site&mt=8";
export const APP_STORE_BLOG_URL = "https://apps.apple.com/app/apple-store/id6762257609?pt=128563123&ct=blog&mt=8";
export const APP_STORE_URLS: Record<StoreCampaign, string> = { site: APP_STORE_URL, blog: APP_STORE_BLOG_URL };

// Google Play: the campaign travels in the referrer parameter, read by the
// Android app at first launch (Install Referrer API) and sent to PostHog. Keep
// it encoded as is (%3D, %26): referrer must stay a single parameter.
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.arthurgriffiths.mellow&referrer=utm_source%3Dmellowmigraine%26utm_medium%3Dweb%26utm_campaign%3Dsite";
export const PLAY_STORE_BLOG_URL =
  "https://play.google.com/store/apps/details?id=com.arthurgriffiths.mellow&referrer=utm_source%3Dmellowmigraine%26utm_medium%3Dweb%26utm_campaign%3Dblog";
export const PLAY_STORE_URLS: Record<StoreCampaign, string> = { site: PLAY_STORE_URL, blog: PLAY_STORE_BLOG_URL };
