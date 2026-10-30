import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <section>
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-sm">
          <p className="mb-6 text-center text-sm text-ink-soft">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-forest underline underline-offset-4">
              Sign up free
            </a>
          </p>
          <SignIn
            routing="hash"
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                card: "shadow-none border border-line rounded-xl bg-card",
                headerTitle: "font-serif text-2xl text-ink",
                headerSubtitle: "text-ink-soft",
                formButtonPrimary: "bg-forest hover:bg-forest-deep text-white font-medium",
                footerActionLink: "text-forest underline",
                formFieldInput: "border-line focus:border-forest",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
