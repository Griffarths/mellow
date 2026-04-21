import { Link } from "@/i18n/navigation";

export default function ContactContentEn() {
  return (
    <>
      <h1>Mellow Support</h1>

      <h2>Contact</h2>
      <p>For any question, bug report, or feedback, reach out to:</p>
      <p>
        <a href="mailto:contact.mellow@proton.me">
          <strong>contact.mellow@proton.me</strong>
        </a>
      </p>
      <p>We read every message and typically reply within 48 hours.</p>

      <h2>About Mellow</h2>
      <p>
        Mellow is a calm, design-forward migraine and headache journal for iOS.
        Log episodes in seconds, track triggers like stress, sleep, hormones,
        and weather, and start seeing the patterns behind your pain.
      </p>
      <p>
        Mellow is a personal tracking tool. It is not a medical device, does
        not provide a diagnosis, and is not a substitute for professional
        medical advice. Always consult a qualified healthcare provider for any
        medical concern.
      </p>

      <h2>Subscriptions</h2>
      <p>
        Mellow is free to download. Mellow Premium unlocks advanced insights,
        unlimited history, weather correlations, and export features.
      </p>

      <h3>Manage or cancel your subscription</h3>
      <p>Subscriptions are managed through your Apple ID:</p>
      <ol>
        <li>
          Open <strong>Settings</strong> on your iPhone
        </li>
        <li>Tap your name at the top</li>
        <li>
          Tap <strong>Subscriptions</strong>
        </li>
        <li>
          Select <strong>Mellow Premium</strong>
        </li>
        <li>
          Tap <strong>Cancel Subscription</strong>
        </li>
      </ol>
      <p>
        Your access remains active until the end of the current billing period.
      </p>

      <h3>Refunds</h3>
      <p>
        Refunds are handled by Apple. Visit{" "}
        <a
          href="https://reportaproblem.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          reportaproblem.apple.com
        </a>
        , sign in with your Apple ID, and select the Mellow purchase.
      </p>

      <h3>Restore purchases</h3>
      <p>
        Open Mellow, go to Settings, and tap &quot;Restore purchases.&quot;
        Make sure you&apos;re signed in with the same Apple ID you used to
        subscribe.
      </p>

      <hr />

      <h2>Legal</h2>
      <ul>
        <li>
          <Link href="/confidentialite">Privacy Policy</Link>
        </li>
        <li>
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use (Apple Standard EULA)
          </a>
        </li>
        <li>
          <Link href="/mentions-legales">Legal Notice</Link>
        </li>
      </ul>
    </>
  );
}
