import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What information Giveport collects, why, and who it is shared with.",
};

export default function PrivacyPage() {
  return (
    <LegalPage label="Legal" title="Privacy" updated="11 October 2026">
      <p>
        This page explains what information Giveport collects, why we need it, and who we share it with.
        We collect as little as we can to run the service safely.
      </p>

      <h2>What we collect from recipients</h2>
      <ul>
        <li><strong>Account details:</strong> email address and password. Passwords are stored only as a secure one-way hash, never in plain text.</li>
        <li><strong>Profile details:</strong> name or organisation name, username, country, photo and story. These appear on your public page.</li>
        <li><strong>Wallet details:</strong> your wallet address, coin and network. Needed to send you donations.</li>
        <li><strong>Activity records:</strong> donations, payouts, logins and wallet changes. Kept to protect your money and to investigate problems.</li>
      </ul>

      <h2>What we collect from donors</h2>
      <ul>
        <li><strong>Donation details:</strong> amount, date, and the page you gave to.</li>
        <li><strong>Optional details:</strong> your name, email and message, only if you choose to give them. Your email is used to send your receipt.</li>
        <li><strong>Card details:</strong> none. You enter card details on the payment partner&apos;s checkout, and Giveport never receives them.</li>
      </ul>

      <h2>Who we share it with</h2>
      <ul>
        <li><strong>Our payment partner</strong>, to process payments and payouts. They may ask donors for extra details to meet their own legal checks.</li>
        <li><strong>Our hosting, database and email providers</strong>, who store and send data for us under their own security terms.</li>
        <li><strong>The recipient</strong> sees a donor&apos;s name and message if the donor gives them. Donor email addresses are not shown to recipients.</li>
        <li><strong>Authorities</strong>, when the law requires it or to stop fraud.</li>
      </ul>
      <p>We do not sell personal information, and we do not use advertising trackers.</p>

      <h2>Public information</h2>
      <p>
        Your donation page is public. Anything you put on it, including your name, photo and story, can be
        seen by anyone with the link. Wallet addresses and blockchain transfers are public by nature.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep account and donation records while your account is open and for as long as we need them
        afterwards to meet legal, tax and anti-fraud obligations. You can ask us to delete your account.
        Some records may be kept where the law requires it.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete the information we hold about you by emailing{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. You may also have
        rights under the data protection laws of your country.
      </p>

      <h2>Cookies</h2>
      <p>
        We use only the cookies needed to keep you logged in and to protect forms from abuse. No
        advertising cookies.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how we use personal information in an important way, we will update this page and
        email recipients.
      </p>
    </LegalPage>
  );
}
