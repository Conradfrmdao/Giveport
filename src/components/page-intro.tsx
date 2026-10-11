type PageIntroProps = {
  label: string;
  title: string;
  children?: React.ReactNode;
};

// The heading block at the top of every inner page.
export function PageIntro({ label, title, children }: PageIntroProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-12 sm:px-8 md:pt-20 md:pb-16">
        <p className="text-xs font-semibold tracking-[0.12em] text-ochre uppercase">{label}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}

export function IntroText({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{children}</p>;
}
