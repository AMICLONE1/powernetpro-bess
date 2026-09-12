import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { LegalLayout, LegalSection } from "@/components/ui/LegalLayout";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How PowerNetPro collects, uses, stores and deletes your personal data, including electricity bills, under India's Digital Personal Data Protection Act.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="Draft">
      <LegalSection heading="Who we are">
        <p>
          {siteConfig.company} (&quot;PowerNetPro&quot;, &quot;we&quot;) provides
          battery energy storage and solar EPC services across{" "}
          {siteConfig.address.serviceArea}. This policy explains how we handle
          personal data you share with us.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>When you request a free audit or contact us, we may collect:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Your name, phone number and (optionally) email address</li>
          <li>Your property type and location</li>
          <li>Your current backup arrangement</li>
          <li>
            Electricity bills you choose to upload, which may contain your
            consumer number, name and address
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Purpose">
        <p>
          We use this information for a single stated purpose:{" "}
          <strong className="text-ink">
            to prepare a free energy audit and proposal for you
          </strong>
          , and to contact you about it. We do not use it for any other purpose
          without your consent.
        </p>
      </LegalSection>

      <LegalSection heading="Consent">
        <p>
          We collect your electricity bills and details only with your explicit
          consent, given by ticking the consent box on our form. That consent is
          recorded with a timestamp. You may withdraw consent at any time (see
          &quot;Your rights&quot; below).
        </p>
      </LegalSection>

      <LegalSection heading="How we store and protect it">
        <ul className="list-disc space-y-1 pl-6">
          <li>Uploaded bills are stored in encrypted object storage, not in any personal email inbox.</li>
          <li>Data is transmitted over encrypted connections (TLS).</li>
          <li>Access is restricted and time-limited through signed URLs.</li>
          <li>Uploaded documents are scanned before storage.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Retention">
        <p>
          We retain uploaded electricity bills for no longer than{" "}
          <strong className="text-ink">12 months</strong>, after which they are
          deleted automatically. Basic enquiry details may be kept longer to
          service any ongoing relationship, and deleted on request.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us to access, correct or delete your personal data, or to
          withdraw consent. To do so, email{" "}
          <a href={`mailto:${siteConfig.email.privacy}`} className="font-medium text-blue hover:underline">
            {siteConfig.email.privacy}
          </a>
          . We action deletion requests within 30 days.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${siteConfig.email.privacy}`} className="font-medium text-blue hover:underline">
            {siteConfig.email.privacy}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
