import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { calculateFeeBreakdown, formatUsd, formatPercent, siteConfig } from "@/lib/config";
import { DonateForm } from "@/components/donate-form";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  const rows = await db
    .select({ displayName: profiles.displayName, bio: profiles.bio, country: profiles.country })
    .from(profiles)
    .where(eq(profiles.username, username))
    .limit(1);

  if (rows.length === 0) {
    return { title: "Page not found" };
  }

  const profile = rows[0];

  return {
    title: `Donate to ${profile.displayName}`,
    description: `${profile.bio.slice(0, 155)}`,
    openGraph: {
      title: `Support ${profile.displayName} on Giveport`,
      description: profile.bio.slice(0, 155),
    },
  };
}

export default async function RecipientPage({ params }: Props) {
  const { username } = await params;

  const rows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.username, username))
    .limit(1);

  if (rows.length === 0 || !rows[0].isActive) {
    notFound();
  }

  const profile = rows[0];
  const fees = calculateFeeBreakdown(50); // default example amount

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
      {/* Left: recipient info */}
      <div>
        {/* Avatar + name */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-forest-tint font-serif text-2xl text-forest"
            aria-hidden="true"
          >
            {profile.displayName[0].toUpperCase()}
          </div>
          <div>
            <h1 className="font-serif text-2xl leading-tight text-ink">{profile.displayName}</h1>
            <p className="mt-0.5 text-sm text-ink-soft">
              {profile.country} · Receives {profile.walletCoin}
            </p>
          </div>
        </div>

        {/* Story */}
        <p className="mt-6 max-w-prose leading-relaxed text-ink-soft">{profile.bio}</p>

        {/* Safeguards — honest small print */}
        <div className="mt-8 space-y-3 border-t border-line pt-6">
          <p className="text-xs font-semibold tracking-[0.1em] text-ink uppercase">How your money travels</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: "🔒", text: "Card details go to our payment partner, not to Giveport." },
              { icon: "📋", text: "Every payment is verified before the recipient gets anything." },
              { icon: "💰", text: `${formatPercent(siteConfig.feePercent)} Giveport fee. The rest goes straight to their wallet.` },
              { icon: "⚠️", text: "See something wrong? Report this page." },
            ].map(({ icon, text }) => (
              <div key={text} className="flex gap-2 text-sm text-ink-soft">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fee breakdown preview */}
        <div className="mt-6 rounded-xl border border-line bg-card p-5">
          <p className="text-xs font-medium text-ink-soft uppercase tracking-wide">Where a $50 donation goes</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Giveport fee ({formatPercent(siteConfig.feePercent)})</dt>
              <dd>{formatUsd(fees.giveportFee)}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Payment processing</dt>
              <dd>{formatUsd(fees.processorFeeMin)}–{formatUsd(fees.processorFeeMax)}</dd>
            </div>
            <div className="flex justify-between border-t border-dashed border-line pt-2 font-semibold text-ink">
              <dt>Reaches {profile.displayName}</dt>
              <dd>≈ {formatUsd(fees.recipientMin)}–{formatUsd(fees.recipientMax)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Right: donation form */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <DonateForm profileId={profile.id} displayName={profile.displayName} />
      </div>
    </div>
  );
}
