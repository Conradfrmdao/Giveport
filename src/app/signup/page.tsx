import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Get your donation link",
  robots: { index: false },
};

export default function SignupPage() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-start md:gap-20 md:py-24">
        <div className="max-w-md">
          <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Get started</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink">
            Set up your donation page in minutes.
          </h1>
          <ul className="mt-8 space-y-4">
            {[
              "Free to sign up — no credit card needed",
              "Your own link: giveport.site/r/yourname",
              "Donors pay by card, Apple Pay, Google Pay or crypto",
              "Money lands in a crypto wallet you control",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.75" />
                </svg>
                <span className="text-ink-soft">{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-soft">
            Already have an account?{" "}
            <a href="/login" className="text-forest underline underline-offset-4">
              Log in
            </a>
          </p>
        </div>

        <div className="w-full max-w-sm">
          <SignUp
            routing="hash"
            forceRedirectUrl="/dashboard/setup"
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
