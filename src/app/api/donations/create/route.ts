import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { donations, profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { siteConfig } from "@/lib/config";

// POST /api/donations/create
// Creates a pending donation record. In production, this would also
// create a checkout session with the payment provider and return the URL.
export async function POST(request: Request) {
  const body = await request.json();
  const { profileId, amountUsd, donorName, donorEmail, donorMessage } = body;

  if (!profileId || !amountUsd || amountUsd < 1) {
    return NextResponse.json(
      { error: "A valid profile and amount are required." },
      { status: 400 }
    );
  }

  // Verify the profile exists and is active
  const profileRows = await db
    .select({ id: profiles.id, isActive: profiles.isActive })
    .from(profiles)
    .where(eq(profiles.id, profileId))
    .limit(1);

  if (profileRows.length === 0 || !profileRows[0].isActive) {
    return NextResponse.json({ error: "Donation page not found." }, { status: 404 });
  }

  const donationId = randomUUID();

  // Insert a pending donation record
  await db.insert(donations).values({
    id: donationId,
    profileId,
    amountUsd: Number(amountUsd),
    donorName: donorName || null,
    donorEmail: donorEmail || null,
    donorMessage: donorMessage || null,
    status: "pending",
  });

  // In test mode: skip real checkout and return null URL (form shows success screen)
  if (siteConfig.testMode) {
    return NextResponse.json({ donationId, checkoutUrl: null });
  }

  // TODO: In production, create a checkout session with the payment provider
  // and return { donationId, checkoutUrl: "https://..." }
  // Example: const session = await paymentProvider.createInvoice({ ... });
  // return NextResponse.json({ donationId, checkoutUrl: session.invoiceUrl });

  return NextResponse.json({ donationId, checkoutUrl: null });
}
