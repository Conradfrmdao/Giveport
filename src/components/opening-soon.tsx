import Link from "next/link";
import { siteConfig } from "@/lib/config";

type OpeningSoonProps = {
  title: string;
  body: string;
};

// Placeholder for sign up and log in until accounts are built in phase 2.
export function OpeningSoon({ title, body }: OpeningSoonProps) {
  return (
    <section>
      <div className="mx-auto max-w-xl px-5 py-20 sm:px-8 md:py-28">
        <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">Opening soon</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{body}</p>
        <p className="mt-5 leading-relaxed text-ink-soft">
          Want to know when it opens? Email{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-forest underline underline-offset-4">
            {siteConfig.contactEmail}
          </a>{" "}
          and we will write back when it is ready.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/how-it-works"
            className="rounded-md bg-forest px-6 py-3 text-center font-medium text-white hover:bg-forest-deep"
          >
            See how it works
          </Link>
          <Link
            href="/"
            className="rounded-md border border-line bg-card px-6 py-3 text-center font-medium text-ink hover:border-ink-soft"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
