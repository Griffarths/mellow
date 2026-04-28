import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://mellowmigraine.com";
const PAGE_LOCALE = "en";
const PAGE_URL = `${SITE_URL}/about`;
const FR_ALTERNATE = `${SITE_URL}/fr/a-propos`;

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: PAGE_LOCALE }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== PAGE_LOCALE) return {};
  return {
    title: "About — Mellow",
    description:
      "The story of Mellow, a migraine tracking app built by Arthur Griffiths, indie developer based in Bordeaux. An app made by someone with migraines, not by a marketing committee.",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        en: PAGE_URL,
        "fr-FR": FR_ALTERNATE,
      },
    },
    openGraph: {
      type: "website",
      title: "About — Mellow",
      description:
        "The story of Mellow, a migraine tracking app built by Arthur Griffiths.",
      url: PAGE_URL,
      locale: "en_US",
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (locale !== PAGE_LOCALE) notFound();
  setRequestLocale(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: PAGE_URL,
    inLanguage: "en-US",
    name: "About — Mellow",
    mainEntity: {
      "@type": "Person",
      name: "Arthur Griffiths",
      jobTitle: "Indie Developer",
      description: "Creator of Mellow, a migraine tracking app",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bordeaux",
        addressCountry: "FR",
      },
    },
  };

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <BackToHome />

        <article className="mx-auto mt-10 max-w-[65ch]">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About
          </h1>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Hi, I&apos;m Arthur 👋
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            I&apos;m{" "}
            <strong className="font-semibold text-ink">Arthur Griffiths</strong>,
            an indie developer based in Bordeaux, France, and I have migraines.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            I built Mellow because{" "}
            <strong className="font-semibold text-ink">
              I needed this app for myself
            </strong>
            .
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            My story with migraine
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            I had my first migraine at{" "}
            <strong className="font-semibold text-ink">21</strong>. Today, I get
            one{" "}
            <strong className="font-semibold text-ink">
              once a week
            </strong>{" "}
            on average.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            I have{" "}
            <strong className="font-semibold text-ink">
              migraine without aura
            </strong>
            . The pain builds up gradually, on one side of my head, until it
            becomes throbbing and disabling. With it come the{" "}
            <strong className="font-semibold text-ink">nausea</strong>, the{" "}
            <strong className="font-semibold text-ink">light sensitivity</strong>{" "}
            and{" "}
            <strong className="font-semibold text-ink">sound sensitivity</strong>
            . It takes out a whole day. Sometimes more.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            If you&apos;re reading this, you probably already know what that
            feels like. That sensation where{" "}
            <strong className="font-semibold text-ink">
              you know it&apos;s coming
            </strong>
            , but you can&apos;t really stop it. That frustration of having to
            cancel things, having to retreat into the dark, feeling out of the
            game for hours.
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            Why this app
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            According to the WHO, migraine is{" "}
            <strong className="font-semibold text-ink">
              the 2nd most disabling condition in the world
            </strong>{" "}
            for people under 50.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            And yet, we keep treating it like a simple headache.{" "}
            <em className="italic">
              &quot;Drink some water, take a Tylenol, you&apos;ll be fine.&quot;
            </em>{" "}
            As if it&apos;s all in your head. As if you&apos;re exaggerating.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            I looked for tools to better understand my own attacks. Identify my
            triggers. See what works, what doesn&apos;t. Have concrete data to
            bring to my doctor.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            What I found frustrated me. Apps so complex they take 5 minutes to
            log an attack when your skull is already pounding. Designs straight
            out of 2010. High prices or aggressive paywalls on basic features.
            Apps that feel like medical records, not like a daily companion.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            So I decided to build one myself. An app{" "}
            <strong className="font-semibold text-ink">
              made by someone with migraines, not by a marketing committee.
            </strong>
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            What I care about in Mellow
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Simple UX.</strong>{" "}
            Logging an attack takes a few seconds. No endless forms. No
            friction. When your head is pounding, you don&apos;t want to fight
            an interface.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">
              Thoughtful design.
            </strong>{" "}
            I believe a tool you use to manage a chronic condition should feel
            good to use. Not anxiety-inducing. Not clinical. Just calming.
            That&apos;s where the name <em className="italic">Mellow</em> comes
            from.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">
              Accessible pricing.
            </strong>{" "}
            Mellow has a generous free tier, and a Premium plan at a
            deliberately low price for those who want to go deeper (detailed
            analytics, personalized statistics, weather data, and more). No
            inflated prices.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">Sourced content.</strong>{" "}
            Every article on the Mellow blog is written from recognized medical
            sources. WHO, Mayo Clinic, NHS, American Migraine Foundation,
            Migraine Trust, and more. No unverified &quot;miracle cures.&quot;
            No health misinformation.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            <strong className="font-semibold text-ink">
              Never selling your data.
            </strong>{" "}
            Mellow will never sell your health data. That&apos;s a hard line.
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            What Mellow is not
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Mellow{" "}
            <strong className="font-semibold text-ink">
              is not a substitute for medical advice
            </strong>
            . If you have frequent or severe migraines, talk to a neurologist
            or your doctor. Mellow is a companion that helps you better
            understand your attacks and have richer conversations with the
            professionals taking care of you.
          </p>

          <h2 className="mt-14 scroll-mt-24 text-3xl font-bold tracking-tight md:text-4xl">
            What&apos;s next
          </h2>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Mellow is still young. I&apos;m building it solo, at my own pace,
            listening to the migraine community using it.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            If you use Mellow and want to share an idea, a bug, or just say hi,
            you can reach me at{" "}
            <strong className="font-semibold text-ink">
              <a
                href="mailto:contact.mellow@proton.me"
                className="text-mellow-rose underline-offset-2 hover:underline"
              >
                contact.mellow@proton.me
              </a>
            </strong>
            .
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">
            Thanks for being here. And take care of yourself.
          </p>
          <p className="my-5 text-lg leading-[1.8] text-black/75">Arthur</p>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function BackToHome() {
  return (
    <a
      href="/"
      className="inline-flex items-center gap-1 text-sm text-black/55 transition hover:text-black"
    >
      ← Home
    </a>
  );
}
