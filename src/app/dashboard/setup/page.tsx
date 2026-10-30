"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AFRICAN_COUNTRIES = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
  "Congo", "DR Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea",
  "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya",
  "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
  "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe",
  "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
  "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda",
  "Zambia", "Zimbabwe",
];

const COINS = ["USDT", "USDC", "BTC", "ETH", "BNB", "TRX"];
const NETWORKS = ["TRC20 (TRON)", "ERC20 (Ethereum)", "BEP20 (BNB Chain)", "Polygon", "Solana", "TON"];

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    displayName: "",
    bio: "",
    country: "",
    walletAddress: "",
    walletCoin: "USDT",
    walletNetwork: "TRC20 (TRON)",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/profile/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                n < step
                  ? "bg-forest text-white"
                  : n === step
                  ? "bg-forest text-white"
                  : "bg-line text-ink-soft"
              }`}
            >
              {n < step ? (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              ) : (
                n
              )}
            </div>
            {n < 3 && <div className={`h-px w-8 ${n < step ? "bg-forest" : "bg-line"}`} />}
          </div>
        ))}
        <span className="ml-2 text-sm text-ink-soft">Step {step} of 3</span>
      </div>

      {/* Step 1: Basic info */}
      {step === 1 && (
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Your page</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">Tell donors who you are.</h1>
          <p className="mt-3 text-ink-soft">This is what donors will see when they visit your page.</p>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-ink">
                Username
              </label>
              <p className="mt-0.5 text-xs text-ink-soft">Your link: giveport.site/r/<strong>{form.username || "yourname"}</strong></p>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => update("username", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                placeholder="yourname"
                className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
                maxLength={32}
              />
            </div>

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-ink">
                Your name or organisation name
              </label>
              <input
                id="displayName"
                type="text"
                value={form.displayName}
                onChange={(e) => update("displayName", e.target.value)}
                placeholder="Grace Akinyi"
                className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-ink">
                Country
              </label>
              <select
                id="country"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
              >
                <option value="">Select your country</option>
                {AFRICAN_COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-ink">
                Your story
              </label>
              <p className="mt-0.5 text-xs text-ink-soft">A few honest lines about who you are and what the money is for.</p>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={4}
                placeholder="I am a secondary school teacher in Accra raising funds for our library..."
                className="mt-2 w-full resize-none rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
                maxLength={500}
              />
              <p className="mt-1 text-right text-xs text-ink-soft">{form.bio.length}/500</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (!form.username || !form.displayName || !form.country || !form.bio) {
                setError("Please fill in all fields.");
                return;
              }
              setError("");
              setStep(2);
            }}
            className="mt-6 w-full rounded-md bg-forest px-6 py-3 font-medium text-white hover:bg-forest-deep"
          >
            Next: Add your wallet
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      )}

      {/* Step 2: Wallet */}
      {step === 2 && (
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Wallet</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">Where should donations go?</h1>
          <p className="mt-3 text-ink-soft">
            Paste the address of a crypto wallet you own. Only you hold the keys.
          </p>

          <div className="mt-8 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="walletCoin" className="block text-sm font-medium text-ink">Coin</label>
                <select
                  id="walletCoin"
                  value={form.walletCoin}
                  onChange={(e) => update("walletCoin", e.target.value)}
                  className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
                >
                  {COINS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="walletNetwork" className="block text-sm font-medium text-ink">Network</label>
                <select
                  id="walletNetwork"
                  value={form.walletNetwork}
                  onChange={(e) => update("walletNetwork", e.target.value)}
                  className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
                >
                  {NETWORKS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-ink">
                Wallet address
              </label>
              <input
                id="walletAddress"
                type="text"
                value={form.walletAddress}
                onChange={(e) => update("walletAddress", e.target.value.trim())}
                placeholder="TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE"
                className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 font-mono text-sm text-ink placeholder:text-ink-soft/60 focus:border-forest focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-ochre/20 bg-ochre-tint p-4 text-sm text-ink-soft">
              <strong className="text-ink">Make sure the network matches your wallet.</strong>
              {" "}Sending USDT on TRC20 to a TRC20 address is safe. Mixing networks can lose the funds permanently.
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="rounded-md border border-line bg-card px-5 py-3 font-medium text-ink hover:border-ink-soft"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!form.walletAddress) {
                  setError("Please enter your wallet address.");
                  return;
                }
                setError("");
                setStep(3);
              }}
              className="flex-1 rounded-md bg-forest px-6 py-3 font-medium text-white hover:bg-forest-deep"
            >
              Next: Review
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Review</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">Everything look right?</h1>

          <dl className="mt-8 space-y-4 rounded-xl border border-line bg-card p-6">
            <div className="flex justify-between border-b border-line pb-4">
              <dt className="text-sm text-ink-soft">Link</dt>
              <dd className="text-sm font-mono text-forest">giveport.site/r/{form.username}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-4">
              <dt className="text-sm text-ink-soft">Name</dt>
              <dd className="text-sm text-ink">{form.displayName}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-4">
              <dt className="text-sm text-ink-soft">Country</dt>
              <dd className="text-sm text-ink">{form.country}</dd>
            </div>
            <div className="border-b border-line pb-4">
              <dt className="text-sm text-ink-soft">Story</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink">{form.bio}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-4">
              <dt className="text-sm text-ink-soft">Coin / Network</dt>
              <dd className="text-sm text-ink">{form.walletCoin} · {form.walletNetwork}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-soft">Wallet address</dt>
              <dd className="mt-1 break-all font-mono text-xs text-ink">{form.walletAddress}</dd>
            </div>
          </dl>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="rounded-md border border-line bg-card px-5 py-3 font-medium text-ink hover:border-ink-soft"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 rounded-md bg-forest px-6 py-3 font-medium text-white hover:bg-forest-deep disabled:opacity-60"
            >
              {loading ? "Creating your page…" : "Create my donation page"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
