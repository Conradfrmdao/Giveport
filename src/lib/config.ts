// Site-wide settings. Money-related values live here so they are never
// hard-coded inside pages. Override them with environment variables on Vercel.

function readNumber(value: string | undefined, fallback: number): number {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return parsed;
}

function readString(value: string | undefined, fallback: string): string {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }
  return value.trim();
}

export const siteConfig = {
  name: "Giveport",
  domain: "giveport.site",
  url: "https://giveport.site",
  contactEmail: readString(process.env.GIVEPORT_CONTACT_EMAIL, "hello@giveport.site"),

  // Giveport's own fee, in percent. Placeholder until the final fee is decided.
  feePercent: readNumber(process.env.GIVEPORT_FEE_PERCENT, 2),

  // Payment processing fee range, in percent.
  // 0.5% for simple payments, 1% for multi-currency or fixed-rate payments.
  processorFeeMinPercent: 0.5,
  processorFeeMaxPercent: 1,

  // The site runs in test mode until payment verification and legal checks are done.
  testMode: true,
};

export type FeeBreakdown = {
  donation: number;
  processorFeeMin: number;
  processorFeeMax: number;
  giveportFee: number;
  recipientMin: number;
  recipientMax: number;
};

function roundToCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

// Works out an example split for a donation, before blockchain network fees.
export function calculateFeeBreakdown(donation: number): FeeBreakdown {
  const processorFeeMin = roundToCents((donation * siteConfig.processorFeeMinPercent) / 100);
  const processorFeeMax = roundToCents((donation * siteConfig.processorFeeMaxPercent) / 100);
  const giveportFee = roundToCents((donation * siteConfig.feePercent) / 100);

  return {
    donation,
    processorFeeMin,
    processorFeeMax,
    giveportFee,
    recipientMin: roundToCents(donation - processorFeeMax - giveportFee),
    recipientMax: roundToCents(donation - processorFeeMin - giveportFee),
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value}%`;
}
