import type { Locale } from "@/i18n/routing";

// Fill with real App Store data. The home section stays hidden in production
// until at least the rating or one review is filled in; in `npm run dev` it
// shows labelled placeholders so the layout can be checked.

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

// Average rating and number of ratings shown on the App Store page,
// e.g. { value: 4.8, count: 127 }.
export const APP_STORE_RATING: { value: number; count: number } | null = null;

// Up to 3 reviews per locale, copied word for word from the App Store.
// Locales without their own reviews fall back to "en", then to "fr".
export const REVIEWS: Partial<Record<Locale, Review[]>> = {
  // fr: [
  //   { author: "Pseudo App Store", rating: 5, text: "Texte exact de l'avis." },
  // ],
};
