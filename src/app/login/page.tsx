import type { Metadata } from "next";
import { OpeningSoon } from "@/components/opening-soon";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <OpeningSoon
      title="Accounts aren't open yet."
      body="Giveport is in testing, so there are no recipient accounts to log in to yet."
    />
  );
}
