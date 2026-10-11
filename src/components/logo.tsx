import Link from "next/link";

// The mark is a simple doorway: a "port" money passes through.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M5 21V10a7 7 0 0 1 14 0v11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path d="M9.5 21v-7.5a2.5 2.5 0 0 1 5 0V21" fill="currentColor" opacity="0.18" />
      <circle cx="12" cy="9.25" r="1.6" fill="var(--ochre)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 text-forest" aria-label="Giveport home">
      <LogoMark className="h-7 w-7" />
      <span className="font-serif text-[1.45rem] leading-none font-medium tracking-tight text-ink">
        Giveport
      </span>
    </Link>
  );
}
