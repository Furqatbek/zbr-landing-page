// Uzbek phone formatting — display as `+998 (XX) XXX-XX-XX`, store as `+998XXXXXXXXX`.

/** Formats free-text input into the readable `+998 (XX) XXX-XX-XX` mask. */
export function formatUzPhone(value: string): string {
  let d = (value || "").replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  let out = "+998";
  if (d.length > 0) out += " (" + d.slice(0, 2);
  if (d.length >= 2) out += ")";
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += "-" + d.slice(5, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  return out;
}

/** Extracts the 9 national digits (no country code) from any formatting. */
export function phoneDigits(value: string): string {
  let d = (value || "").replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  return d.slice(0, 9);
}

/** True once a complete 9-digit national number has been entered. */
export function isValidUzPhone(value: string): boolean {
  return phoneDigits(value).length === 9;
}

/** Canonical storage form, e.g. `+998901234567`. */
export function canonicalPhone(value: string): string {
  return "+998" + phoneDigits(value);
}
