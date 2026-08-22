import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

/**
 * Public privacy policy for the ZBR customer app (package `app.zbr.customer`).
 * Host at https://www.zbrr.uz/privacy and enter that URL in the Play Console
 * listing and App Store Connect.
 *
 * TODO — confirm/replace the placeholder values below before publishing. Any
 * field left empty renders as a visible "[ … ]" marker on the page.
 */
const DETAILS = {
  lastUpdated: "22 August 2026",
  legalEntity: "Istiqlol Tech LLC",
  address: "Katta Chilonzor-1 MFY, Arnasoy ko'chasi, 6-a-uy, Tashkent, Uzbekistan",
  supportEmail: "simple.furqat@gmail.com",
  supportTelegram: "", // optional — not provided
  supportPhone: "+998 94 114 32 32",
  minAge: "14",
  packageId: "app.zbr.customer",
};

/** Render a value, or a visible placeholder marker if it hasn't been filled in. */
function field(value: string, label: string) {
  return value ? value : `[ ${label} ]`;
}

const h2: React.CSSProperties = {
  fontSize: "clamp(22px, 2.6vw, 30px)",
  letterSpacing: "-0.02em",
  margin: "44px 0 14px",
};

const p: React.CSSProperties = {
  color: "var(--ink-2)",
  fontSize: 16,
  lineHeight: 1.7,
  margin: "0 0 14px",
};

const ul: React.CSSProperties = {
  color: "var(--ink-2)",
  fontSize: 16,
  lineHeight: 1.7,
  margin: "0 0 14px",
  paddingLeft: 22,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const subhead: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  margin: "22px 0 8px",
  color: "var(--ink)",
};

export function Privacy() {
  const { t } = useI18n();

  const email = DETAILS.supportEmail;
  const tg = DETAILS.supportTelegram;
  const phone = DETAILS.supportPhone;

  return (
    <div>
      <Nav dark={false} transparent={false} />

      {/* HEADER */}
      <section style={{ background: "var(--bg-2)", paddingTop: 48, paddingBottom: 56 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Link
            to="/"
            style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)", display: "inline-block", marginBottom: 24 }}
          >
            ← {t.pitchHome}
          </Link>
          <span className="eyebrow">
            <span className="dot" />
            ZBR
          </span>
          <h1
            className="display"
            style={{ fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.03em", margin: "16px 0 12px" }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15, margin: 0 }}>
            Last updated: {DETAILS.lastUpdated}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section style={{ background: "var(--bg)", paddingTop: 8, paddingBottom: 88 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <p style={{ ...p, marginTop: 32 }}>
            This Privacy Policy explains how <strong>{field(DETAILS.legalEntity, "Legal entity name")}</strong>{" "}
            ("we", "us"), the developer of the <strong>ZBR</strong> food-delivery app (package{" "}
            <code>{DETAILS.packageId}</code>), collects, uses, and protects your information. By using ZBR you
            agree to this policy.
          </p>

          <h2 className="display" style={h2}>1. Information we collect</h2>

          <div style={subhead}>Account information</div>
          <ul style={ul}>
            <li><strong>Phone number</strong> — required to create your account and sign in via one-time SMS code (OTP).</li>
            <li><strong>Name</strong> — shown on your orders.</li>
            <li><strong>Email address</strong> — optional; used only if you provide it.</li>
          </ul>

          <div style={subhead}>Location</div>
          <ul style={ul}>
            <li>
              <strong>Precise (GPS) location</strong> — used, only while you are using the app, to detect your
              delivery point and calculate the delivery fee. Your last chosen location is cached on your device and
              saved with any address you store.
            </li>
            <li>Coordinates are sent to <strong>OpenStreetMap (Nominatim)</strong> to turn them into a readable address.</li>
          </ul>

          <p style={p}>
            <strong>Delivery addresses</strong> — the addresses you save (street, apartment, entrance, notes, and
            their coordinates).
          </p>
          <p style={p}>
            <strong>Orders</strong> — your order history, items, amounts, and delivery details.
          </p>
          <p style={p}>
            <strong>Reviews</strong> — ratings and comments you choose to submit about a restaurant or courier.
          </p>
          <p style={p}>
            <strong>Device &amp; notifications</strong> — a push-notification token (Firebase Cloud Messaging on
            Android, Apple Push Notification service on iOS) so we can send order-status updates, plus basic
            device/app information.
          </p>
          <p style={p}>
            <strong>Diagnostics</strong> — if enabled, anonymous crash reports and performance data via{" "}
            <strong>Sentry</strong>, to help us fix problems.
          </p>

          <div style={subhead}>What we do NOT collect</div>
          <ul style={ul}>
            <li>
              We do <strong>not</strong> collect or store card or bank details. ZBR is <strong>cash on delivery</strong>{" "}
              only — you pay the courier directly.
            </li>
            <li>We do <strong>not</strong> track your location in the background.</li>
          </ul>

          <h2 className="display" style={h2}>2. How we use your information</h2>
          <ul style={ul}>
            <li>Create and secure your account, and sign you in.</li>
            <li>Take, prepare, deliver, and let you track your orders.</li>
            <li>Calculate delivery fees and show nearby availability.</li>
            <li>Send order-status notifications.</li>
            <li>Provide customer support.</li>
            <li>Diagnose crashes and improve the app.</li>
          </ul>
          <p style={p}>
            We do <strong>not</strong> sell your personal data, and we do <strong>not</strong> use it for
            third-party advertising.
          </p>

          <h2 className="display" style={h2}>3. Who we share it with</h2>
          <p style={p}>We share the minimum needed to run the service, with:</p>
          <ul style={ul}>
            <li><strong>Our backend / hosting provider</strong> — stores your account, addresses and orders.</li>
            <li>
              <strong>Restaurants and couriers</strong> — receive the order details (name, phone, address, items)
              needed to prepare and deliver it.
            </li>
            <li>
              <strong>Firebase Cloud Messaging (Google)</strong> and <strong>Apple Push Notification service</strong>{" "}
              — deliver push notifications.
            </li>
            <li><strong>OpenStreetMap (Nominatim)</strong> — reverse-geocodes coordinates to an address.</li>
            <li><strong>Sentry</strong> — receives crash/diagnostic data (if enabled).</li>
          </ul>
          <p style={p}>We may disclose information where required by law.</p>

          <h2 className="display" style={h2}>4. Data security</h2>
          <ul style={ul}>
            <li>All traffic between the app and our servers uses <strong>HTTPS/TLS</strong>.</li>
            <li>
              Authentication tokens are stored in the device's <strong>secure keystore</strong> (iOS Keychain /
              Android Keystore), not in plain storage.
            </li>
          </ul>

          <h2 className="display" style={h2}>5. Data retention and deletion</h2>
          <p style={p}>We keep your data for as long as your account is active.</p>
          <p style={p}>
            You can <strong>delete your account at any time</strong> in the app:{" "}
            <strong>Settings → Delete account.</strong> This permanently deletes your account, order history, saved
            addresses, and profile. Deletion is <strong>immediate and cannot be undone</strong>; there is no grace
            period. Some records may be retained only where the law requires (e.g. transaction records for
            tax/accounting).
          </p>
          <p style={p}>
            To request deletion by other means, contact us at {email ? <a href={`mailto:${email}`}>{email}</a> : field("", "support email")}.
          </p>

          <h2 className="display" style={h2}>6. Children</h2>
          <p style={p}>
            ZBR is not directed to children under the age of {DETAILS.minAge}, and we do not knowingly collect their
            data.
          </p>

          <h2 className="display" style={h2}>7. Your rights</h2>
          <p style={p}>
            Depending on your jurisdiction you may request access to, correction of, or deletion of your personal
            data. Contact {email ? <a href={`mailto:${email}`}>{email}</a> : field("", "support email")}.
          </p>

          <h2 className="display" style={h2}>8. Changes to this policy</h2>
          <p style={p}>
            We may update this policy; we will change the "Last updated" date above and, for significant changes,
            notify you in the app.
          </p>

          <h2 className="display" style={h2}>9. Contact</h2>
          <ul style={ul}>
            <li>
              <strong>{field(DETAILS.legalEntity, "Legal entity name")}</strong>, {field(DETAILS.address, "Company address")}
            </li>
            <li>
              Email: {email ? <a href={`mailto:${email}`}>{email}</a> : field("", "support email")}
            </li>
            {tg && (
              <li>
                Telegram:{" "}
                <a href={`https://t.me/${tg.replace(/^@/, "")}`} target="_blank" rel="noopener noreferrer">
                  {tg}
                </a>
              </li>
            )}
            <li>
              Phone: {phone ? <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a> : field("", "support phone")}
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
