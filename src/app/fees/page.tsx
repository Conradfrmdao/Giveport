import type { Metadata } from "next";
import { FeeExample } from "@/components/fee-example";
import { IntroText, PageIntro } from "@/components/page-intro";
import { formatPercent, siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Fees",
  description: "Every fee on a Giveport donation, who charges it and why.",
};

type FeeLine = {
  name: string;
  amount: string;
  chargedBy: string;
  explanation: string;
};

const feeLines: FeeLine[] = [
  {
    name: "Signing up",
    amount: "Free",
    chargedBy: "—",
    explanation: "No sign-up fee, no monthly fee, no minimum.",
  },
  {
    name: "Giveport fee",
    amount: `${formatPercent(siteConfig.feePercent)} per donation`,
    chargedBy: "Giveport",
    explanation:
      "Covers running the site, confirming payments, sending payouts, and checking reported pages.",
  },
  {
    name: "Payment processing",
    amount: `${formatPercent(siteConfig.processorFeeMinPercent)}–${formatPercent(siteConfig.processorFeeMaxPercent)}`,
    chargedBy: "Our payment partner",
    explanation:
      "Our payment partner charges 0.5% on simple payments and 1% when currencies are converted or the rate is fixed.",
  },
  {
    name: "Card, Apple Pay, Google Pay",
    amount: "Shown at checkout",
    chargedBy: "Payment partner",
    explanation:
      "Turning card money into crypto can carry an extra charge. The donor sees it on the checkout page before paying.",
  },
  {
    name: "Network fee",
    amount: "Varies",
    chargedBy: "The blockchain",
    explanation:
      "Every crypto transfer pays a small fee to the network. It depends on the coin and network on your profile, which is why we suggest low-fee options.",
  },
];

export default function FeesPage() {
  return (
    <>
      <PageIntro label="Fees" title="What it costs, who charges it, and why.">
        <IntroText>
          No hidden charges. Every fee on a donation is listed here, and donors see the breakdown on
          your page before they pay.
        </IntroText>
      </PageIntro>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
          <div className="overflow-x-auto rounded-xl border border-line bg-card">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs tracking-wide text-ink-soft uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">Fee</th>
                  <th scope="col" className="px-5 py-3 font-medium">Amount</th>
                  <th scope="col" className="px-5 py-3 font-medium">Charged by</th>
                  <th scope="col" className="px-5 py-3 font-medium">What it is for</th>
                </tr>
              </thead>
              <tbody>
                {feeLines.map((line) => (
                  <tr key={line.name} className="border-b border-line last:border-b-0">
                    <th scope="row" className="px-5 py-4 align-top font-medium text-ink">{line.name}</th>
                    <td className="px-5 py-4 align-top whitespace-nowrap text-ink">{line.amount}</td>
                    <td className="px-5 py-4 align-top text-ink-soft">{line.chargedBy}</td>
                    <td className="px-5 py-4 align-top leading-relaxed text-ink-soft">{line.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-ink">Worked examples</h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              These show what reaches your wallet before the network fee. The processing fee is a
              range because it depends on how the donor pays.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-ink">A $25 donation</p>
              <FeeExample amount={25} />
            </div>
          </div>
          <div className="lg:pt-[7.5rem]">
            <p className="mb-3 text-sm font-medium text-ink">A $250 donation</p>
            <FeeExample amount={250} />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
          <div className="prose-gp">
            <h2>Why not just use PayPal or Stripe?</h2>
            <p>
              Neither one lets people across Africa receive payouts reliably. Crypto stablecoins
              are one of the few routes that let a donor in London or Toronto pay with an ordinary card
              and have the money reach someone in Nairobi, Accra or Kampala without a bank in the middle.
            </p>
            <h2>Will the fee change?</h2>
            <p>
              If Giveport&apos;s fee ever changes, we will post the new fee on this page and email
              recipients before it applies. A change never affects donations that are already paid.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
