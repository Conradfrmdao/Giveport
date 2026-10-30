import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PATCH /api/profile/wallet — request a wallet address change.
// In production this would send an email confirmation link before applying.
// For now it updates immediately and is clearly noted in the UI.
export async function PATCH(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json();
  const { walletAddress, walletCoin, walletNetwork } = body;

  if (!walletAddress || !walletCoin || !walletNetwork) {
    return NextResponse.json({ error: "All wallet fields are required." }, { status: 400 });
  }

  // TODO: In production, send an email with a confirmation token.
  // Only apply the wallet change when the token is verified.
  // For now, apply immediately (this is fine in test mode).

  const updated = await db
    .update(profiles)
    .set({
      walletAddress: String(walletAddress).trim(),
      walletCoin: String(walletCoin),
      walletNetwork: String(walletNetwork),
      updatedAt: new Date(),
    })
    .where(eq(profiles.clerkUserId, userId))
    .returning();

  if (updated.length === 0) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  return NextResponse.json({ profile: updated[0] });
}
