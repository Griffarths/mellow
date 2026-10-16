export const APP_STORE_ID = "6762257609";

// App Store campaign links (App Store Connect), so that Metrics Studio can
// tell where installs come from. "site": the site's own buttons (navbar,
// mobile menu, footer, QR code, home, the app and doctor pages, the tools),
// on every page, the blog's included. "blog": the buttons that belong to the
// blog (the app rows in articles, the final block of the articles, of the
// blog's home and of its categories). /download keeps its own "tiktok" link.
export const APP_STORE_URL = "https://apps.apple.com/app/apple-store/id6762257609?pt=128563123&ct=site&mt=8";
export const APP_STORE_BLOG_URL = "https://apps.apple.com/app/apple-store/id6762257609?pt=128563123&ct=blog&mt=8";

export type AppStoreCampaign = "site" | "blog";
export const APP_STORE_URLS: Record<AppStoreCampaign, string> = { site: APP_STORE_URL, blog: APP_STORE_BLOG_URL };

// Set once Mellow is public on Google Play
// (https://play.google.com/store/apps/details?id=com.arthurgriffiths.mellow).
// While null, Google Play badges are hidden and the menu keeps pointing to
// the /android tester page.
export const PLAY_STORE_URL: string | null = null;
