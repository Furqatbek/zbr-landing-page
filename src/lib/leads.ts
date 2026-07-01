// Client-side lead submission. Posts to the /api/lead serverless function,
// which forwards the lead to Telegram. Throws on failure so the form can show
// an error state.

export type LeadType = "vendor" | "courier" | "newsletter";

export interface LeadPayload {
  type: LeadType;
  phone: string; // canonical, e.g. +998901234567
  name?: string | null;
  org?: string | null;
  transport?: string | null;
  lang?: string | null;
  source?: string | null;
}

export async function submitLead(lead: LeadPayload): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
}
