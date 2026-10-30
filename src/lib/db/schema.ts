// Drizzle ORM schema for Giveport.
// Tables: profiles (recipient pages), donations (records of each payment).
// The users table is managed by Clerk — we link by clerk_user_id.

import { pgTable, text, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";

// One row per Giveport recipient account.
// clerk_user_id comes from Clerk and is the foreign key linking Clerk → our DB.
export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(), // same as clerk_user_id
  clerkUserId: text("clerk_user_id").notNull().unique(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  bio: text("bio").notNull().default(""),
  country: text("country").notNull().default(""),
  photoUrl: text("photo_url"),
  walletAddress: text("wallet_address").notNull().default(""),
  walletCoin: text("wallet_coin").notNull().default("USDT"),
  walletNetwork: text("wallet_network").notNull().default(""),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// One row per confirmed donation.
export const donations = pgTable("donations", {
  id: text("id").primaryKey(), // UUID
  profileId: text("profile_id")
    .notNull()
    .references(() => profiles.id),
  // Amount in USD that the donor chose
  amountUsd: real("amount_usd").notNull(),
  // Optional donor details
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  donorMessage: text("donor_message"),
  // Payment state: pending | confirmed | failed
  status: text("status").notNull().default("pending"),
  // External payment reference
  paymentRef: text("payment_ref"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  confirmedAt: timestamp("confirmed_at"),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;
