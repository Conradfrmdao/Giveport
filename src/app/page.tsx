import Link from "next/link";
import { ExampleDonationCard } from "@/components/example-donation-card";
import { FeeExample } from "@/components/fee-example";
import { MoneyFlow } from "@/components/money-flow";
import { formatPercent, siteConfig } from "@/lib/config";

const recipientPoints = [
  "Sign up with an email and add the address of a crypto wallet you already own.",
  "Write a short story about who you are and what the money is for.",
  "Share your link on WhatsApp, Facebook, email or anywhere else.",
  "See every donation in your dashboard and cash out through a local exchange when it suits you.",
];

const donorPoints = [
  "Pay with the card or phone wallet you already use. No crypto knowledge needed.",
  "See the fee before you pay, not after.",
  "Get an email receipt if you leave your address.",
  "Report a page with one click if something looks wrong.",
];

const safeguards = [
  {
    title: "We never touch card details",
    body: "Checkout is run by NOWPayments. Card numbers go to them and their card partner, never to Giveport's servers.",
  },
  {
    title: "Wallet changes are locked down",
    body: "Changing the wallet that receives money needs your password again plus an email confirmation, and every change is logged.",
  },
  {
    title: "Every payment is verified",
    body: "A donation only counts once NOWPayments sends a signed confirmation. Amounts are never taken from the browser.",
  },
  {
    title: "Bad pages get stopped",
    body: "Every donation page has a report link, and accounts can be paused straight away while we look into it.",
  },
];

const honestLimits = [
  "You need your own crypto wallet. We explain how to get one, but we do not hold money for you.",
  "Giveport does not pay out to mobile money or bank accounts yet. You cash out yourself, for example through a local exchange.",
  "Crypto prices can move. We recommend stablecoins like USDT or USDC, which track the US dollar.",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">{children}</p>;
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-16 sm:px-8 md:pt-20 md:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm text-ink-soft">For people in Uganda and across Africa</p>
            <h1 className="mt-4 font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Receive donations from abroad, straight to your own wallet.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Stripe and PayPal don&apos;t pay out here. Giveport gives you a personal donation link
              that people abroad can pay by card, Apple Pay, Google Pay or crypto. The money arrives
              in a crypto wallet that you control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="rounded-md bg-forest px-6 py-3.5 text-center font-medium text-white transition-colors hover:bg-forest-deep"
              >
                Get your donation link
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-md border border-line bg-card px-6 py-3.5 text-center font-medium text-ink transition-colors hover:border-ink-soft"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              Free to sign up. {formatPercent(siteConfig.feePercent)} Giveport fee per donation, plus
              the payment processor&apos;s fee.{" "}
              <Link href="/fees" className="text-forest underline underline-offset-4">
                Full breakdown
              </Link>
            </p>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <ExampleDonationCard />
          </div>
        </div>
      </section>

      {/* How the money moves */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <div className="max-w-2xl">
            <SectionLabel>How the money moves</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              Four steps from a donor&apos;s card to your wallet.
            </h2>
            <p className="mt-4 text-ink-soft">
              Nothing hidden in the middle. Each step is a real company or a record you can see.
            </p>
          </div>
          <div className="mt-12">
            <MoneyFlow />
          </div>
        </div>
      </section>

      {/* Recipients and donors */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 md:grid-cols-2 md:gap-20 md:py-24">
          <div>
            <SectionLabel>If you are receiving</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
              A page that looks as serious as your cause.
            </h2>
            <ol className="mt-8 space-y-5">
              {recipientPoints.map((point, index) => (
                <li key={point} className="flex gap-4">
                  <span className="pt-0.5 font-serif text-lg leading-none text-forest">{index + 1}.</span>
                  <span className="leading-relaxed text-ink-soft">{point}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-ink-soft">
              For individuals, families, churches, schools, clinics and small community groups.
            </p>
          </div>

          <div className="md:border-l md:border-line md:pl-20">
            <SectionLabel>If you are giving</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
              Pay the way you already pay for things online.
            </h2>
            <ul className="mt-8 space-y-5">
              {donorPoints.map((point) => (
                <li key={point} className="flex gap-4">
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                  <span className="leading-relaxed text-ink-soft">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-soft">
              Card payments are handled by a card-to-crypto partner of NOWPayments.
            </p>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="border-b border-line bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionLabel>Fees</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              What a $100 donation looks like.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Sign-up is free and there is no monthly charge. Giveport takes{" "}
              {formatPercent(siteConfig.feePercent)} of each donation. NOWPayments takes its own small
              processing fee, and the blockchain charges a network fee to move the money.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Donors see this breakdown on your page before they pay.
            </p>
            <Link
              href="/fees"
              className="mt-6 inline-block font-medium text-forest underline underline-offset-4"
            >
              Read the full fee page
            </Link>
          </div>
          <FeeExample amount={100} />
        </div>
      </section>

      {/* Safeguards */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
          <div className="max-w-2xl">
            <SectionLabel>Safety</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              Sending money to a stranger should feel safe. Here is what we do about it.
            </h2>
          </div>
          <dl className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {safeguards.map((item) => (
              <div key={item.title} className="border-t border-ink/80 pt-5">
                <dt className="font-medium text-ink">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Honest limits */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:py-20">
          <div>
            <SectionLabel>Before you sign up</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">What Giveport does not do.</h2>
          </div>
          <ul className="space-y-5">
            {honestLimits.map((limit) => (
              <li key={limit} className="flex gap-4 border-b border-line pb-5 last:border-b-0 last:pb-0">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" aria-hidden="true" />
                <span className="leading-relaxed text-ink-soft">{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-forest text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between md:py-20">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
              Your link: {siteConfig.domain}/r/<span className="text-[#f2c48d]">yourname</span>
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Set it up in a few minutes. You will need an email address and a crypto wallet
              address. We will help with the wallet if you don&apos;t have one yet.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-md bg-white px-6 py-3.5 text-center font-medium text-forest-deep transition-colors hover:bg-paper"
            >
              Get your donation link
            </Link>
            <Link
              href="/faq"
              className="rounded-md border border-white/30 px-6 py-3.5 text-center font-medium text-white transition-colors hover:border-white/70"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
