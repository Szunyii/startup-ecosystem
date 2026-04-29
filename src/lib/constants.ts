export const startupCategory = [
  "Biotech & Life Sciences",
  "Health Tech & Medtech",
  "Fintech",
  "Edtech",
  "Space",
  "Defence",
  "Aviation",
  "AI",
  "eCommerce & Marketplace",
  "Cybersecurity",
  "Marketing",
  "Transportation",
  "Robotics",
  "Other B2B Software",
  "Energy",
  "Food",
  "Consumer Services",
  "Semiconductors",
] as const;

export type StartupCategory = (typeof startupCategory)[number];
