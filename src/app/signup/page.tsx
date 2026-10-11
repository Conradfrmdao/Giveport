import type { Metadata } from "next";
import { OpeningSoon } from "@/components/opening-soon";

export const metadata: Metadata = {
  title: "Get your link",
  robots: { index: false },
};

export default function SignupPage() {
  return (
    <OpeningSoon
      title="Sign-ups open soon."
      body="We are finishing payment checks with our processor before anyone can receive real money. Accounts open as soon as that is done."
    />
  );
}
