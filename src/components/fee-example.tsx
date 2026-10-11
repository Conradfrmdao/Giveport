import { calculateFeeBreakdown, formatPercent, formatUsd, siteConfig } from "@/lib/config";

type Row = {
  label: string;
  note: string;
  value: string;
};

// A worked example of where each dollar of a donation goes.
export function FeeExample({ amount }: { amount: number }) {
  const fees = calculateFeeBreakdown(amount);

  const rows: Row[] = [
    {
      label: "Donor gives",
      note: "The amount the donor picks on your page",
      value: formatUsd(fees.donation),
    },
    {
      label: `Payment processing, ${formatPercent(siteConfig.processorFeeMinPercent)}–${formatPercent(siteConfig.processorFeeMaxPercent)}`,
      note: "Charged by NOWPayments, who run the checkout",
      value: `− ${formatUsd(fees.processorFeeMin)}–${formatUsd(fees.processorFeeMax)}`,
    },
    {
      label: `Giveport fee, ${formatPercent(siteConfig.feePercent)}`,
      note: "Pays for running the service and checking accounts",
      value: `− ${formatUsd(fees.giveportFee)}`,
    },
    {
      label: "Blockchain network fee",
      note: "Small on low-fee networks; depends on the coin you choose",
      value: "− varies",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Example fees on a {formatUsd(amount)} donation</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line">
              <th scope="row" className="px-5 py-4 align-top font-normal">
                <span className="block font-medium text-ink">{row.label}</span>
                <span className="mt-0.5 block text-xs text-ink-soft">{row.note}</span>
              </th>
              <td className="px-5 py-4 text-right align-top whitespace-nowrap text-ink">{row.value}</td>
            </tr>
          ))}
          <tr className="bg-forest-tint">
            <th scope="row" className="px-5 py-4 font-semibold text-forest-deep">
              Reaches your wallet
            </th>
            <td className="px-5 py-4 text-right text-base font-semibold whitespace-nowrap text-forest-deep">
              ≈ {formatUsd(fees.recipientMin)}–{formatUsd(fees.recipientMax)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
