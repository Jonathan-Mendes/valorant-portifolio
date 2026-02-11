export function makeAgentGradient(colors: string[]) {
  const safe = (colors ?? [])
    .filter(Boolean)
    .slice(0, 4)
    .map((c) => (c.startsWith("#") ? c : `#${c}`));

  if (safe.length < 2) return "linear-gradient(135deg, #111827, #000000)";

  return `linear-gradient(135deg, ${safe.join(", ")})`;
}
