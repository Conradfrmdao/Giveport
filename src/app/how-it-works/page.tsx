import type { Metadata } from "next";
import Link from "next/link";
import { MoneyFlow } from "@/components/money-flow";
import { IntroText, PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "How it works",
  description: "How a donation travels from a donor abroad to a recipient's crypto wallet with Giveport.",
};

type Stage = {
  title: string;
  paragraphs: string[];
};

const recipientStages: Stage[] = [
  {
    title: "Create your account",
    paragraphs: [
      "Sign up with your email address and a password. Pick a username. It becomes your link, for example " +
        `${siteConfig.domain}/r/yourname.`,
    ],
  },
  {
    title: "Add your wallet",
    paragraphs: [
      "Paste the address of a crypto wallet you own, and choose the coin and network. We suggest USDT or USDC on a low-fee network, because they track the US dollar and cost little to move.",
      "If you don't have a wallet yet, you can open one with a well-known wallet app or an exchange that serves your country. Only you hold the keys. Giveport never asks for them.",
    ],
  },
  {
    title: "Tell your story",
    paragraphs: [
      "Add your name or your organisation's name, your country, a photo and a few honest lines about what the money is for. Donors give more when they understand exactly who they are helping.",
    ],
  },
  {
    title: "Share your link",
    paragraphs: [
      "Send it on WhatsApp, post it on Facebook, put it in an email or print it as a QR code. Anyone with the link can give.",
    ],
  },
];

const donationStages: Stage[] = [
  {
    title: "The donor picks an amount",
    paragraphs: [
      "They open your page, choose an amount in US dollars and can leave their name, email and a short message. All three are optional.",
    ],
  },
  {
    title: "They pay on a secure checkout",
    paragraphs: [
      "Giveport sends the donor to a secure checkout page run by our payment partner. They can pay by card, Apple Pay, Google Pay or crypto. Card payments are converted into crypto during checkout.",
    ],
  },
  {
    title: "The payment is confirmed",
    paragraphs: [
      "When the payment is finished, our payment partner sends Giveport a signed confirmation. We check the signature, match it against our own records, and only then mark the donation as paid.",
    ],
  },
  {
    title: "Your share is sent to your wallet",
    paragraphs: [
      `Giveport keeps its ${siteConfig.feePercent}% fee and sends the rest to the wallet on your profile. The donation, the fee and the payout all appear in your dashboard.`,
    ],
  },
  {
    title: "You cash out when you choose",
    paragraphs: [
      "The money is in your wallet. You can hold it, send it on, or sell it for local currency through an exchange or peer-to-peer service in your country. Giveport does not do this step for you yet.",
    ],
  },
];

function StageList({ stages, startAt }: { stages: Stage[]; startAt: number }) {
  return (
    <ol className="space-y-10">
      {stages.map((stage, index) => (
        <li key={stage.title} className="grid gap-3 sm:grid-cols-[4rem_1fr] sm:gap-6">
          <span className="font-serif text-3xl leading-none text-forest/40">
            {String(startAt + index).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-medium text-ink">{stage.title}</h3>
            {stage.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro label="How it works" title="From a donor's card to your wallet, step by step.">
        <IntroText>
          Giveport sits between a donor abroad and your own crypto wallet. Here is everything that
          happens, in order, and who is responsible at each step.
        </IntroText>
      </PageIntro>

      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <h2 className="font-serif text-2xl text-ink">The short version</h2>
          <div className="mt-10">
            <MoneyFlow />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[16rem_1fr] md:py-20">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-ink">Setting up your page</h2>
            <p className="mt-3 text-sm text-ink-soft">For recipients. Takes a few minutes.</p>
          </div>
          <StageList stages={recipientStages} startAt={1} />
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[16rem_1fr] md:py-20">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-ink">When someone donates</h2>
            <p className="mt-3 text-sm text-ink-soft">What happens behind the button.</p>
          </div>
          <StageList stages={donationStages} startAt={recipientStages.length + 1} />
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
          <h2 className="font-serif text-2xl text-ink">A note on holding money</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
            Between the payment being confirmed and the payout reaching you, the money sits briefly in
            Giveport&apos;s payout account. We treat that seriously: every payout is recorded, failed
            payouts are retried, and wallet changes need your password and an email confirmation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/fees"
              className="rounded-md bg-forest px-6 py-3 text-center font-medium text-white hover:bg-forest-deep"
            >
              See the fees
            </Link>
            <Link
              href="/faq"
              className="rounded-md border border-line bg-card px-6 py-3 text-center font-medium text-ink hover:border-ink-soft"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
