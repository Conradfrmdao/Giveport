import Link from "next/link";
import { Suspense } from "react";
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/fees", label: "Fees" },
  { href: "/faq", label: "FAQ" },
];

function TestModeNotice() {
  if (!siteConfig.testMode) {
    return null;
  }
  return (
    <div className="border-b border-ochre/20 bg-ochre-tint text-[0.8125rem] text-ink">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-2 sm:px-8">
        <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" aria-hidden="true" />
        <p>
          Giveport is in testing. Sign-ups and real donations open once payment checks are finished.
        </p>
      </div>
    </div>
  );
}

// Auth controls are wrapped in Suspense because <Show> reads the request,
// which is required when cacheComponents: true (the Next 16 default).
function AuthControls() {
  return (
    <Suspense fallback={<div className="h-8 w-32 animate-pulse rounded-md bg-line" />}>
      <Show when="signed-out">
        <div className="hidden items-center gap-5 md:flex">
          <SignInButton>
            <button className="text-[0.9375rem] text-ink-soft hover:text-ink">Log in</button>
          </SignInButton>
          <SignUpButton>
            <button className="rounded-md bg-forest px-4 py-2 text-[0.9375rem] font-medium text-white transition-colors hover:bg-forest-deep">
              Get your link
            </button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/dashboard"
            className="text-[0.9375rem] text-ink-soft hover:text-ink"
          >
            Dashboard
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </Show>
    </Suspense>
  );
}

function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <summary className="cursor-pointer rounded-md border border-line px-3 py-1.5 text-sm text-ink">
        Menu
      </summary>
      <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-line bg-card p-2 shadow-[0_8px_24px_rgba(24,32,28,0.08)]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-md px-3 py-2.5 text-[0.9375rem] text-ink hover:bg-paper"
          >
            {link.label}
          </Link>
        ))}
        <div className="my-2 border-t border-line" />
        <Suspense>
          <Show when="signed-out">
            <SignInButton>
              <button className="block w-full rounded-md px-3 py-2.5 text-left text-[0.9375rem] text-ink hover:bg-paper">
                Log in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="mt-1 block w-full rounded-md bg-forest px-3 py-2.5 text-center text-[0.9375rem] font-medium text-white">
                Get your link
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2.5 text-[0.9375rem] text-ink hover:bg-paper"
            >
              Dashboard
            </Link>
          </Show>
        </Suspense>
      </div>
    </details>
  );
}

export function SiteHeader() {
  return (
    <header>
      <TestModeNotice />
      <div className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.9375rem] text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <AuthControls />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
