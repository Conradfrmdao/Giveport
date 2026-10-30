"use client";

import { useState } from "react";

const PRESET_AMOUNTS = [10, 25, 50, 100];

type Props = {
  profileId: string;
  displayName: string;
};

type Step = "amount" | "details" | "paying" | "done" | "error";

export function DonateForm({ profileId, displayName }: Props) {
  const [step, setStep] = useState<Step>("amount");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  function getFinalAmount(): number {
    if (customAmount && Number(customAmount) >= 1) {
      return Number(customAmount);
    }
    return selectedAmount;
  }

  function amountBtnClass(amount: number): string {
    const base = "rounded-md border py-2.5 text-center text-sm font-medium transition-colors";
    const active = "border-forest bg-forest-tint text-forest-deep";
    const idle = "border-line bg-card text-ink hover:border-ink-soft";

    if (customAmount) {
      return `${base} ${idle}`;
    }
    if (amount === selectedAmount) {
      return `${base} ${active}`;
    }
    return `${base} ${idle}`;
  }

  async function handleProceed() {
    const amount = getFinalAmount();

    if (amount < 1) {
      setErrorMsg("Minimum donation is $1.");
      return;
    }

    setErrorMsg("");
    setStep("paying");

    const res = await fetch("/api/donations/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileId,
        amountUsd: amount,
        donorName: donorName.trim() || null,
        donorEmail: donorEmail.trim() || null,
        donorMessage: donorMessage.trim() || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || "Something went wrong. Please try again.");
      setStep("details");
      return;
    }

    if (data.checkoutUrl) {
      setCheckoutUrl(data.checkoutUrl);
      window.location.href = data.checkoutUrl;
    } else {
      // In test mode: no real checkout URL, just show success
      setStep("done");
    }
  }

  if (step === "done") {
    return (
      <div className="rounded-xl border border-line bg-card p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-tint">
          <svg viewBox="0 0 20 20" className="h-6 w-6 text-forest" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-4 font-serif text-2xl text-ink">Thank you!</h2>
        <p className="mt-2 text-ink-soft">
          Your donation to {displayName} is recorded. A receipt will be sent if you provided your email.
        </p>
      </div>
    );
  }

  if (step === "paying") {
    return (
      <div className="rounded-xl border border-line bg-card p-6 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-line border-t-forest" />
        <p className="mt-4 text-ink-soft">Setting up checkout…</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-card shadow-[0_1px_0_rgba(24,32,28,0.04),0_24px_48px_-24px_rgba(24,32,28,0.14)]">
      <div className="p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.1em] text-ink-soft uppercase">
          Donate to {displayName}
        </p>

        {/* Amount selector */}
        <div className="mt-4">
          <p className="text-sm font-medium text-ink">Choose an amount (USD)</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={amountBtnClass(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-soft">$</span>
              <input
                type="number"
                min={1}
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="Other amount"
                className="w-full rounded-md border border-line bg-card py-2.5 pl-7 pr-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Optional donor details */}
        <div className="mt-5 space-y-3 border-t border-dashed border-line pt-4">
          <p className="text-xs text-ink-soft">Optional — leave anonymous if you prefer</p>
          <input
            type="text"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
          />
          <input
            type="email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            placeholder="Email for receipt"
            className="w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
          />
          <textarea
            rows={2}
            value={donorMessage}
            onChange={(e) => setDonorMessage(e.target.value)}
            placeholder="Short message (optional)"
            className="w-full resize-none rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
            maxLength={200}
          />
        </div>

        {errorMsg && (
          <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
        )}

        <button
          onClick={handleProceed}
          className="mt-4 w-full rounded-md bg-forest py-3 text-center font-medium text-white transition-colors hover:bg-forest-deep"
        >
          Donate ${getFinalAmount()}
        </button>

        <p className="mt-2.5 text-center text-[0.6875rem] text-ink-soft">
          Card · Apple Pay · Google Pay · Crypto
        </p>
      </div>
    </div>
  );
}
