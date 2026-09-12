import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { LegalLayout, LegalSection } from "@/components/ui/LegalLayout";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for the PowerNetPro website, including the free audit request and sizing calculator.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="Draft">
      <LegalSection heading="About these terms">
        <p>
          These terms govern your use of the {siteConfig.company} website. By
          using the site you agree to them.
        </p>
      </LegalSection>

      <LegalSection heading="Estimates are indicative">
        <p>
          The sizing calculator and any cost figures on this site are{" "}
          <strong className="text-ink">indicative estimates only</strong>, shown
          as ranges. They are not quotations. Final capacity, specification and
          pricing are confirmed only after a site survey and audit.
        </p>
      </LegalSection>

      <LegalSection heading="The free audit">
        <p>
          The free audit is provided at no cost and with no obligation. Providing
          your details does not create a contract to buy or supply anything.
        </p>
      </LegalSection>

      <LegalSection heading="Your content">
        <p>
          By uploading electricity bills you confirm they are yours to share, and
          you consent to our using them to prepare your audit, as described in
          our{" "}
          <a href="/privacy" className="font-medium text-blue hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy">
        <p>
          We try to keep information accurate and current, but the site is
          provided &quot;as is&quot; without warranties. Product specifications
          may change.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${siteConfig.email.sales}`} className="font-medium text-blue hover:underline">
            {siteConfig.email.sales}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
