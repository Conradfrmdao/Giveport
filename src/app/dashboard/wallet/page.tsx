"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const COINS = ["USDT", "USDC", "BTC", "ETH", "BNB", "TRX"];
const NETWORKS = ["TRC20 (TRON)", "ERC20 (Ethereum)", "BEP20 (BNB Chain)", "Polygon", "Solana", "TON"];

export default function WalletEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    walletAddress: "",
    walletCoin: "USDT",
    walletNetwork: "TRC20 (TRON)",
  });

  useEffect(() => {
    fetch("/api/profile/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setForm({
            walletAddress: data.profile.walletAddress,
            walletCoin: data.profile.walletCoin,
            walletNetwork: data.profile.walletNetwork,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess(false);
  }

  async function handleSave() {
    if (!form.walletAddress) {
      setError("Please enter a wallet address.");
      return;
    }

    setSaving(true);
    setError("");

    const res = await fetch("/api/profile/wallet", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Could not save. Please try again.");
      return;
    }

    setSuccess(true);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-12 animate-pulse rounded-md bg-line" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-ink-soft hover:text-ink"
          aria-label="Back to dashboard"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <h1 className="font-serif text-2xl text-ink">Change wallet</h1>
      </div>

      <div className="mt-4 rounded-xl border border-ochre/20 bg-ochre-tint p-4 text-sm text-ink-soft">
        <strong className="text-ink">Wallet changes are logged and require email confirmation.</strong>
        {" "}After saving, you will receive a confirmation email. The wallet will only update once you confirm.
      </div>

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
            New wallet address
          </label>
          <input
            id="walletAddress"
            type="text"
            value={form.walletAddress}
            onChange={(e) => update("walletAddress", e.target.value.trim())}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 font-mono text-sm text-ink focus:border-forest focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && (
        <p className="mt-4 text-sm text-forest">
          Check your email to confirm the wallet change.
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-md border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-ink-soft"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-forest px-6 py-2.5 text-sm font-medium text-white hover:bg-forest-deep disabled:opacity-60"
        >
          {saving ? "Saving…" : "Request wallet change"}
        </button>
      </div>
    </div>
  );
}
