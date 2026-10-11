import { calculateFeeBreakdown, formatPercent, formatUsd, siteConfig } from "@/lib/config";

const presetAmounts = [10, 25, 50, 100];
const selectedAmount = 50;

function amountButtonClass(amount: number): string {
  const base = "rounded-md border py-2 text-center text-sm font-medium";
  if (amount === selectedAmount) {
    return `${base} border-forest bg-forest-tint text-forest-deep`;
  }
  return `${base} border-line bg-card text-ink`;
}

// A static preview of what a recipient's public page looks like.
// It is clearly labelled as an example so nobody mistakes it for a real person.
export function ExampleDonationCard() {
  const fees = calculateFeeBreakdown(selectedAmount);

  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_1px_0_rgba(24,32,28,0.04),0_24px_48px_-24px_rgba(24,32,28,0.18)]">
        {/* Browser-style address bar */}
        <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-2.5 py-1 text-xs text-ink-soft">
            <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-forest" aria-hidden="true">
              <path
                d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v6.5h-9z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="truncate">{siteConfig.domain}/r/yourname</span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-tint font-serif text-lg text-forest"
              aria-hidden="true"
            >
              Y
            </div>
            <div className="min-w-0">
              <p className="font-serif text-xl leading-tight text-ink">Your name or organisation</p>
              <p className="mt-0.5 text-xs text-ink-soft">Uganda · Receives USDT</p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            A few honest lines about who you are and what the money is for. School fees, a clinic
            bill, a church roof, a small business.
          </p>

          <div className="mt-5">
            <p className="text-xs font-medium text-ink">Choose an amount (USD)</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {presetAmounts.map((amount) => (
                <div key={amount} className={amountButtonClass(amount)}>
                  ${amount}
                </div>
              ))}
            </div>
          </div>

          <dl className="mt-5 space-y-1.5 border-t border-dashed border-line pt-4 text-xs">
            <div className="flex justify-between text-ink-soft">
              <dt>Giveport fee ({formatPercent(siteConfig.feePercent)})</dt>
              <dd>{formatUsd(fees.giveportFee)}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Payment processing (NOWPayments)</dt>
              <dd>
                {formatUsd(fees.processorFeeMin)}–{formatUsd(fees.processorFeeMax)}
              </dd>
            </div>
            <div className="flex justify-between pt-1 text-sm font-semibold text-ink">
              <dt>Reaches the wallet</dt>
              <dd>
                ≈ {formatUsd(fees.recipientMin)}–{formatUsd(fees.recipientMax)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 rounded-md bg-forest py-2.5 text-center text-sm font-medium text-white">
            Donate ${selectedAmount}
          </div>
          <p className="mt-2.5 text-center text-[0.6875rem] text-ink-soft">
            Card · Apple Pay · Google Pay · Crypto
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-soft">
        Example page. Your own story and photo go here.
      </figcaption>
    </figure>
  );
}
