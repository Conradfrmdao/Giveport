"use client";

import { useState, useEffect } from "react";
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

export default function ProfileEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    country: "",
  });

  useEffect(() => {
    fetch("/api/profile/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setForm({
            displayName: data.profile.displayName,
            bio: data.profile.bio,
            country: data.profile.country,
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
    if (!form.displayName || !form.bio || !form.country) {
      setError("All fields are required.");
      return;
    }

    setSaving(true);
    setError("");

    const res = await fetch("/api/profile/update", {
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
          {[1, 2, 3].map((n) => (
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
        <h1 className="font-serif text-2xl text-ink">Edit your page</h1>
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-ink">
            Name or organisation
          </label>
          <input
            id="displayName"
            type="text"
            value={form.displayName}
            onChange={(e) => update("displayName", e.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
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
            {AFRICAN_COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-ink">
            Your story
          </label>
          <textarea
            id="bio"
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            rows={5}
            className="mt-2 w-full resize-none rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none"
            maxLength={500}
          />
          <p className="mt-1 text-right text-xs text-ink-soft">{form.bio.length}/500</p>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {success && (
        <p className="mt-4 text-sm text-forest">Your page has been updated.</p>
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
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
