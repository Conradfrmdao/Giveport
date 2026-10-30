type FlowStep = {
  label: string;
  who: string;
  detail: string;
  highlight?: boolean;
};

const steps: FlowStep[] = [
  {
    label: "Donor pays",
    who: "Anywhere abroad",
    detail: "Card, Apple Pay, Google Pay or crypto, on your page. No account needed.",
  },
  {
    label: "Secure checkout",
    who: "Payment processor",
    detail: "Takes the payment and converts card money into crypto. Giveport never sees card numbers.",
  },
  {
    label: "Giveport",
    who: "Records and splits",
    detail: "Confirms the payment, takes the stated fee, sends the rest on.",
  },
  {
    label: "Your wallet",
    who: "You control it",
    detail: "USDT or USDC lands in your own wallet. Cash out locally when you choose.",
    highlight: true,
  },
];

function stepNumberClass(step: FlowStep): string {
  if (step.highlight) {
    return "bg-ochre text-white";
  }
  return "bg-forest text-white";
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 40 12"
      aria-hidden="true"
      className="hidden h-3 w-10 shrink-0 self-center text-line md:block"
    >
      <path d="M0 6h36M31 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Shows the actual path money takes, in order. Used on the landing and how-it-works pages.
export function MoneyFlow() {
  return (
    <ol className="flex flex-col gap-0 md:flex-row md:items-stretch md:gap-2">
      {steps.map((step, index) => (
        <li key={step.label} className="flex flex-col md:flex-1 md:flex-row md:gap-2">
          {index > 0 && <Arrow />}
          {index > 0 && <span className="ml-[0.9rem] h-5 w-px bg-line md:hidden" aria-hidden="true" />}
          <div className="flex gap-4 md:flex-1 md:flex-col md:gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${stepNumberClass(step)}`}
            >
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-ink">{step.label}</p>
              <p className="text-xs tracking-wide text-ink-soft uppercase">{step.who}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
