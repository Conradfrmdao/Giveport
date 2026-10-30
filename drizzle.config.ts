import { defineConfig } from "drizzle-kit";

// drizzle.config.ts — used by `npx drizzle-kit push` to migrate the Neon database.
// Run: npx drizzle-kit push
// This reads DATABASE_URL from .env.local and applies the schema in src/lib/db/schema.ts

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
