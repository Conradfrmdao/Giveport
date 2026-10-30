import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// POST /api/profile/create
// Creates a new profile linked to the authenticated Clerk user.
export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json();
  const { username, displayName, bio, country, walletAddress, walletCoin, walletNetwork } = body;

  // Basic validation
  if (!username || !displayName || !bio || !country || !walletAddress || !walletCoin || !walletNetwork) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const usernameClean = String(username).toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (usernameClean.length < 3 || usernameClean.length > 32) {
    return NextResponse.json({ error: "Username must be 3–32 characters." }, { status: 400 });
  }

  // Check the user doesn't already have a profile
  const existing = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.clerkUserId, userId))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ error: "Profile already exists." }, { status: 409 });
  }

  // Check the username isn't taken
  const taken = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.username, usernameClean))
    .limit(1);

  if (taken.length > 0) {
    return NextResponse.json({ error: "That username is already taken. Try another." }, { status: 409 });
  }

  // Create the profile
  const newProfile = await db
    .insert(profiles)
    .values({
      id: userId,
      clerkUserId: userId,
      username: usernameClean,
      displayName: String(displayName).trim(),
      bio: String(bio).trim(),
      country: String(country).trim(),
      walletAddress: String(walletAddress).trim(),
      walletCoin: String(walletCoin),
      walletNetwork: String(walletNetwork),
    })
    .returning();

  return NextResponse.json({ profile: newProfile[0] }, { status: 201 });
}
