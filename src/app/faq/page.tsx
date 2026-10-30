import type { Metadata } from "next";
import Link from "next/link";
import { IntroText, PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions from Giveport recipients and donors.",
};

type Question = {
  question: string;
  answer: string;
};

type QuestionGroup = {
  title: string;
  questions: Question[];
};

const groups: QuestionGroup[] = [
  {
    title: "For recipients",
    questions: [
      {
        question: "Who can use Giveport?",
        answer:
          "People and groups across Africa who need to receive donations from abroad: individuals, families, churches, schools, clinics and small community groups. You must be 18 or older and the money must be for a lawful purpose. Our terms list what is not allowed.",
      },
      {
        question: "What is a crypto wallet and do I need one?",
        answer:
          "A crypto wallet is an app or account that holds digital currency, and yes, you need one. It has an address, a long string of letters and numbers, that people can send money to. You can open one with a well-known wallet app or with an exchange that serves your country. Keep your recovery words private. Giveport will never ask for them.",
      },
      {
        question: "Which coin should I choose?",
        answer:
          "We suggest a stablecoin, USDT or USDC, on a low-fee network. Stablecoins track the US dollar, so the value doesn't swing the way Bitcoin does, and low-fee networks keep the cost of each transfer small. Make sure the network you pick on Giveport matches the network of your wallet address.",
      },
      {
        question: "How do I turn it into local currency?",
        answer:
          "You sell the crypto yourself, for example on a local exchange or a peer-to-peer service that pays out to mobile money or a bank account. Giveport does not do this step yet. We plan to publish simple guides for popular exchanges in different African countries.",
      },
      {
        question: "How fast does the money arrive?",
        answer:
          "Once the donor's payment is confirmed, Giveport sends your share to your wallet. Crypto payments usually confirm within minutes. Card payments can take longer while the payment partner completes its checks.",
      },
      {
        question: "What if someone gets into my account?",
        answer:
          "Changing the wallet that receives your money needs your password again and a confirmation link sent to your email, and every change is recorded. This stops someone who steals a login from quietly redirecting your donations. Use a strong password you don't use anywhere else.",
      },
    ],
  },
  {
    title: "For donors",
    questions: [
      {
        question: "Do I need crypto to donate?",
        answer:
          "No. You can pay by card, Apple Pay or Google Pay. The payment is turned into crypto behind the scenes and sent to the recipient. If you already hold crypto, you can pay with that directly.",
      },
      {
        question: "Who handles my card details?",
        answer:
          "Our payment partner. You enter your card on their secure checkout page, not on Giveport. We never see or store your card number.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. You can give without signing up. If you leave your email address, we send you a receipt.",
      },
      {
        question: "How do I know a page is genuine?",
        answer:
          "Read the story and, where you can, confirm with the person directly before you give, the same as you would for any request for money. Every page has a report link. Pages that are reported are reviewed and can be paused immediately.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Crypto transfers can't be reversed once they reach the recipient's wallet, so please check before you give. If you believe a page is a scam, report it straight away and email us. We will pause the account while we look into it.",
      },
      {
        question: "Is my donation tax-deductible?",
        answer:
          "Usually not. Giveport is a payment service, not a registered charity, and most recipients are individuals or small groups. Check with a tax adviser in your country.",
      },
    ],
  },
  {
    title: "About Giveport",
    questions: [
      {
        question: "Why should I trust Giveport?",
        answer:
          "Because we are open about how it works. Every fee is published on our fees page. Every donation and payout is recorded. Payments go through a regulated processor. And you can email a real person if something goes wrong.",
      },
      {
        question: "Why not mobile money or bank payouts?",
        answer:
          "Paying out to mobile money and banks across many countries needs licences and partners that a new service doesn't have yet. Sending to a wallet you control is the simplest safe route for now.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageIntro label="FAQ" title="Questions people ask before they trust us with money.">
        <IntroText>
          Can&apos;t find your answer? Email{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-forest underline underline-offset-4">
            {siteConfig.contactEmail}
          </a>
          .
        </IntroText>
      </PageIntro>

      {groups.map((group) => (
        <section key={group.title} className="border-b border-line">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[16rem_1fr] md:py-16">
            <h2 className="font-serif text-2xl text-ink">{group.title}</h2>
            <div className="divide-y divide-line border-y border-line">
              {group.questions.map((item) => (
                <details key={item.question} className="group py-1">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 py-4 text-left font-medium text-ink">
                    <span>{item.question}</span>
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-transform group-open:rotate-45"
                    >
                      <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </summary>
                  <p className="max-w-2xl pb-5 leading-relaxed text-ink-soft">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="text-ink-soft">
            Still deciding?{" "}
            <Link href="/how-it-works" className="text-forest underline underline-offset-4">
              See how it works
            </Link>{" "}
            or{" "}
            <Link href="/fees" className="text-forest underline underline-offset-4">
              check the fees
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
