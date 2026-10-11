import { PageIntro } from "@/components/page-intro";

type LegalPageProps = {
  label: string;
  title: string;
  updated: string;
  children: React.ReactNode;
};

// Shared layout for terms and privacy so both read the same way.
export function LegalPage({ label, title, updated, children }: LegalPageProps) {
  return (
    <>
      <PageIntro label={label} title={title}>
        <p className="mt-4 text-sm text-ink-soft">Last updated {updated}</p>
      </PageIntro>
      <section>
        <div className="mx-auto max-w-6xl px-5 pt-4 pb-20 sm:px-8">
          <div className="prose-gp">{children}</div>
        </div>
      </section>
    </>
  );
}
