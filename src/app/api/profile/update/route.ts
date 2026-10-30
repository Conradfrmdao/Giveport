import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// PATCH /api/profile/update — updates display name, bio, country
export async function PATCH(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json();
  const { displayName, bio, country } = body;

  if (!displayName || !bio || !country) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const updated = await db
    .update(profiles)
    .set({
      displayName: String(displayName).trim(),
      bio: String(bio).trim(),
      country: String(country).trim(),
      updatedAt: new Date(),
    })
    .where(eq(profiles.clerkUserId, userId))
    .returning();

  if (updated.length === 0) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  return NextResponse.json({ profile: updated[0] });
}
