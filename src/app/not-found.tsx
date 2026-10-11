import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="mx-auto max-w-xl px-5 py-24 sm:px-8 md:py-32">
        <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Page not found</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          If someone sent you a donation link, check that it was copied in full.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-forest px-6 py-3 font-medium text-white hover:bg-forest-deep"
        >
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
