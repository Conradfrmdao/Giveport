import Link from "next/link";
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

          <div className="hidden items-center gap-5 md:flex">
            <Link href="/login" className="text-[0.9375rem] text-ink-soft hover:text-ink">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-forest px-4 py-2 text-[0.9375rem] font-medium text-white transition-colors hover:bg-forest-deep"
            >
              Get your link
            </Link>
          </div>

          {/* Small screens: a no-JavaScript menu that works on slow connections. */}
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
              <Link href="/login" className="block rounded-md px-3 py-2.5 text-[0.9375rem] text-ink hover:bg-paper">
                Log in
              </Link>
              <Link
                href="/signup"
                className="mt-1 block rounded-md bg-forest px-3 py-2.5 text-center text-[0.9375rem] font-medium text-white"
              >
                Get your link
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
