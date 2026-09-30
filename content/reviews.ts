import type { Locale } from "@/i18n/routing";

// Real App Store data. The home section stays hidden in production until at
// least the rating or one review is filled in; in `npm run dev` it shows
// labelled placeholders so the layout can be checked.

export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  // Word for word from the App Store; line breaks are kept.
  text: string;
};

// Average rating and number of ratings shown on the App Store page.
export const APP_STORE_RATING: { value: number; count: number } | null = {
  value: 4.8,
  count: 50,
};

// Up to 3 reviews per locale, in that locale's language. Locales without
// reviews show the rating alone.
export const REVIEWS: Partial<Record<Locale, Review[]>> = {
  fr: [
    {
      author: "Elodie.261",
      rating: 5,
      title: "Découverte de Mellow",
      text: "J’avais commencé à noter chaque jour et chaque carte de migraine dans mes notes, je note également mes symptômes et potentiellement ce qui pouvait en mettre le déclencheur. Je ne trouvais pas cela du tout pratique et assez ennuyant à faire. Quand j’ai entendu parler de Mellow, j’ai donc directement décidé de tester. J’en suis très agréablement surprise, je trouve l’application simple d’utilisation et très complète ☺️",
    },
    {
      author: "Gwen 33550",
      rating: 5,
      title: "Super !!!",
      text: "Un accompagnement au top avec cette app\nJe peux suivre mes épisodes de migraine et identifier la fréquence et les élément précurseurs\nUn design tout en douceur",
    },
  ],
};
