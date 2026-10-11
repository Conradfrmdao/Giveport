import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/config";

const columns = [
  {
    title: "Giveport",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/fees", label: "Fees" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of use" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

// Cached at build time; the site is redeployed often enough to keep the year current.
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Donation links for people in Uganda and across Africa. Payments are processed by
            NOWPayments. Giveport never sees card details.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs font-semibold tracking-[0.08em] text-ink uppercase">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-xs font-semibold tracking-[0.08em] text-ink uppercase">Contact</h2>
          <p className="mt-4 text-sm text-ink-soft">
            Questions, problems or a page you think is a scam:
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-1 inline-block text-sm font-medium text-forest underline underline-offset-4"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-soft sm:flex-row sm:justify-between sm:px-8">
          <p>
            © <CopyrightYear /> Giveport. Made in Uganda.
          </p>
          <p>Giveport is not a bank and does not hold deposits.</p>
        </div>
      </div>
    </footer>
  );
}
