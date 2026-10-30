// A scrolling strip showing African countries Giveport serves.
// Intentional, specific — not a generic "we serve the world" blob.
const countries = [
  "🇳🇬 Nigeria",
  "🇬🇭 Ghana",
  "🇰🇪 Kenya",
  "🇿🇦 South Africa",
  "🇹🇿 Tanzania",
  "🇺🇬 Uganda",
  "🇷🇼 Rwanda",
  "🇸🇳 Senegal",
  "🇪🇹 Ethiopia",
  "🇨🇮 Côte d'Ivoire",
  "🇿🇲 Zambia",
  "🇿🇼 Zimbabwe",
  "🇨🇲 Cameroon",
  "🇲🇿 Mozambique",
  "🇲🇱 Mali",
  "🇧🇫 Burkina Faso",
  "🇲🇼 Malawi",
  "🇸🇱 Sierra Leone",
  "🇱🇷 Liberia",
  "🇹🇬 Togo",
  "🇧🇯 Benin",
  "🇨🇩 DR Congo",
  "🇦🇴 Angola",
  "🇳🇦 Namibia",
  "🇧🇼 Botswana",
];

export function AfricaStrip() {
  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...countries, ...countries];

  return (
    <div className="border-b border-line bg-paper-deep py-4">
      <p className="mb-2.5 text-center text-[0.6875rem] font-semibold tracking-[0.1em] text-ink-soft uppercase">
        Serving recipients across Africa
      </p>
      <div className="marquee-wrapper">
        <ul className="animate-marquee" aria-hidden="true">
          {doubled.map((country, i) => (
            <li
              key={i}
              className="mx-5 shrink-0 text-sm text-ink-soft"
            >
              {country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
