// Neon serverless database connection + Drizzle ORM client.
// DATABASE_URL must be set in Vercel environment variables.
// Format: postgresql://user:password@host/dbname?sslmode=require

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

// Export a lazy singleton so connection is only established when used.
export const db = getDb();
