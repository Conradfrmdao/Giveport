import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The rules for using Giveport as a recipient or a donor.",
};

export default function TermsPage() {
  return (
    <LegalPage label="Legal" title="Terms of use" updated="11 October 2026">
      <p>
        These terms explain the rules for using Giveport at {siteConfig.domain}. By creating an account
        or making a donation, you agree to them. Giveport is currently in testing. These terms will be
        reviewed again before real donations open, and we will tell recipients about any changes.
      </p>

      <h2>1. What Giveport is</h2>
      <p>
        Giveport is a service that gives recipients a public donation page and passes donations made on
        that page to the recipient&apos;s own crypto wallet. Payments are processed by NOWPayments and
        its partners. Giveport is not a bank, does not hold deposits, does not offer savings or
        investments, and is not a registered charity.
      </p>

      <h2>2. Who can be a recipient</h2>
      <ul>
        <li>You must be at least 18 years old.</li>
        <li>You may sign up as an individual or on behalf of a group, church, school or organisation you are authorised to represent.</li>
        <li>The information on your page must be true, and the money must be used for what you say it is for.</li>
        <li>You must own and control the wallet address you add to your profile.</li>
        <li>You may only have one account unless we agree otherwise.</li>
      </ul>

      <h2>3. What is not allowed</h2>
      <p>You may not use Giveport to:</p>
      <ul>
        <li>raise money through false stories, impersonation, or pages about people who have not agreed to them;</li>
        <li>fund violence, terrorism, hate, or harm to children;</li>
        <li>sell goods or services, or take payments that are not genuine donations;</li>
        <li>offer investments, loans, lotteries, gambling or &quot;money doubling&quot; schemes;</li>
        <li>move money for someone else or hide where money comes from;</li>
        <li>break the laws of Uganda, the recipient&apos;s country or the donor&apos;s country.</li>
      </ul>
      <p>
        We may pause or close any account that breaks these rules, and we may report suspected crime to
        the authorities.
      </p>

      <h2>4. Fees</h2>
      <p>
        Giveport&apos;s fee is {siteConfig.feePercent}% of each donation. Payment processing and network
        fees are charged on top by third parties. All fees are listed on the{" "}
        <Link href="/fees">fees page</Link>. We will email recipients before changing our fee, and a
        change never applies to donations already paid.
      </p>

      <h2>5. How payouts work</h2>
      <p>
        After NOWPayments confirms a donation, Giveport deducts its fee and sends the rest to the wallet
        address on the recipient&apos;s profile. You are responsible for entering the correct address
        and network. Crypto sent to a wrong address usually cannot be recovered. We may hold a payout
        while we look into a report, a suspected scam, or a request from law enforcement.
      </p>

      <h2>6. Donations are final</h2>
      <p>
        Once a payout reaches a recipient&apos;s wallet it cannot be reversed. Donors should only give to
        people or causes they trust. If you think a page is fraudulent, report it at once using the link
        on the page or by emailing <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>7. Your account</h2>
      <p>
        Keep your password private. Changing your payout wallet requires your password and an email
        confirmation. Tell us straight away if you think someone else has access to your account.
      </p>

      <h2>8. Taxes and local rules</h2>
      <p>
        Recipients are responsible for any taxes on money they receive and for following the rules on
        crypto in their own country. Donors are responsible for the rules in theirs.
      </p>

      <h2>9. Limits of our responsibility</h2>
      <p>
        We work hard to keep Giveport running and safe, but we can&apos;t promise it will always be
        available or error-free. We are not responsible for losses caused by third-party services
        (including payment processors, exchanges and blockchains), by changes in crypto prices, or by a
        wrong wallet address. Nothing in these terms limits rights you have under the law that cannot be
        limited.
      </p>

      <h2>10. Ending your account</h2>
      <p>
        You can close your account at any time by emailing us. We will send any confirmed payouts still
        owed to you to your registered wallet, unless they are held under section 5.
      </p>

      <h2>11. Changes and contact</h2>
      <p>
        We may update these terms. If a change is important, we will tell recipients by email before it
        applies. Questions about these terms:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
