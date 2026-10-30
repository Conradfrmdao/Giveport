import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { profiles, donations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  // Check if the user has set up a profile yet
  const profileRows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.clerkUserId, userId))
    .limit(1);

  const profile = profileRows[0];

  if (!profile) {
    redirect("/dashboard/setup");
  }

  // Fetch recent donations for this profile
  const recentDonations = await db
    .select()
    .from(donations)
    .where(eq(donations.profileId, profile.id))
    .orderBy(donations.createdAt)
    .limit(10);

  const totalConfirmed = recentDonations
    .filter((d) => d.status === "confirmed")
    .reduce((sum, d) => sum + d.amountUsd, 0);

  const donationLink = `https://${siteConfig.domain}/r/${profile.username}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      {/* Page title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Your account</p>
          <h1 className="mt-1 font-serif text-3xl text-ink">Dashboard</h1>
        </div>
        <a
          href={donationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2 text-sm text-ink-soft hover:border-ink-soft"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 2H2v12h12v-4M9 2h5v5M14 2l-7 7" />
          </svg>
          View your page
        </a>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-card p-6">
          <dt className="text-sm text-ink-soft">Total received</dt>
          <dd className="mt-1 font-serif text-3xl text-ink">
            ${totalConfirmed.toFixed(2)}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-card p-6">
          <dt className="text-sm text-ink-soft">Donations</dt>
          <dd className="mt-1 font-serif text-3xl text-ink">
            {recentDonations.filter((d) => d.status === "confirmed").length}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-card p-6">
          <dt className="text-sm text-ink-soft">Your link</dt>
          <dd className="mt-2 break-all font-mono text-xs text-forest">
            {siteConfig.domain}/r/{profile.username}
          </dd>
        </div>
      </dl>

      {/* Copy link */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-forest-tint p-4">
        <span className="min-w-0 flex-1 truncate font-mono text-sm text-forest-deep">{donationLink}</span>
        <button
          id="copy-link-btn"
          className="shrink-0 rounded-md border border-forest/20 bg-white px-3 py-1.5 text-xs font-medium text-forest hover:bg-forest-tint"
          onClick={() => navigator.clipboard.writeText(donationLink)}
        >
          Copy
        </button>
      </div>

      {/* Recent donations */}
      <div className="mt-10">
        <h2 className="font-serif text-xl text-ink">Recent donations</h2>
        {recentDonations.length === 0 ? (
          <div className="mt-4 rounded-xl border border-line bg-card p-8 text-center">
            <p className="text-ink-soft">No donations yet. Share your link to get started.</p>
            <a
              href={donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-deep"
            >
              See your donation page
            </a>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper text-xs tracking-wide text-ink-soft uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">From</th>
                  <th scope="col" className="px-5 py-3 font-medium">Amount</th>
                  <th scope="col" className="px-5 py-3 font-medium">Status</th>
                  <th scope="col" className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-line last:border-b-0">
                    <td className="px-5 py-4 text-ink">
                      {donation.donorName || <span className="text-ink-soft">Anonymous</span>}
                    </td>
                    <td className="px-5 py-4 font-medium text-ink">
                      ${donation.amountUsd.toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          donation.status === "confirmed"
                            ? "bg-forest-tint text-forest-deep"
                            : donation.status === "failed"
                            ? "bg-red-50 text-red-700"
                            : "bg-ochre-tint text-ochre"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">
                      {new Date(donation.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick settings link */}
      <div className="mt-10 border-t border-line pt-8">
        <h2 className="font-serif text-xl text-ink">Settings</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/profile"
            className="rounded-xl border border-line bg-card p-5 hover:border-ink-soft"
          >
            <p className="font-medium text-ink">Edit your page</p>
            <p className="mt-1 text-sm text-ink-soft">
              Update your name, photo, story and country.
            </p>
          </Link>
          <Link
            href="/dashboard/wallet"
            className="rounded-xl border border-line bg-card p-5 hover:border-ink-soft"
          >
            <p className="font-medium text-ink">Change wallet</p>
            <p className="mt-1 text-sm text-ink-soft">
              Update the address that receives your donations.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
