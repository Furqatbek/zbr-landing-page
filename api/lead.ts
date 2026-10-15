// Serverless function (Vercel-compatible Node runtime) that forwards a captured
// lead to Telegram. The frontend POSTs JSON to /api/lead; configure
// TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as env vars.
//
// Everything lives in this one file on purpose. The logic used to sit in a
// sibling `_lead.ts` that this imported, and the platform compiles files under
// api/ with its own TypeScript settings rather than this repo's — so whichever
// extension the specifier carried, it failed to resolve there and the function
// crashed on every request while the repo's own build stayed green. A file that
// imports nothing cannot be broken by someone else's module resolution.
//
// `vite.config.ts` imports `handleLead` from here so dev and production run the
// same code.

export type LeadType = "vendor" | "courier" | "newsletter";

export interface Lead {
  type: LeadType;
  name?: string | null;
  org?: string | null;
  phone: string;
  transport?: string | null;
  lang?: string | null;
  source?: string | null;
}

export interface LeadResult {
  status: number;
  body: { ok: boolean; error?: string };
}

const PHONE_RE = /^\+998\d{9}$/;

export function validateLead(input: unknown): { lead: Lead } | { error: string } {
  if (typeof input !== "object" || input === null) return { error: "Invalid payload" };
  const raw = input as Record<string, unknown>;

  const type = raw.type;
  if (type !== "vendor" && type !== "courier" && type !== "newsletter") {
    return { error: "Invalid lead type" };
  }

  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  if (!PHONE_RE.test(phone)) return { error: "Invalid phone number" };

  if ((type === "vendor" || type === "courier") && (typeof raw.name !== "string" || !raw.name.trim())) {
    return { error: "Name is required" };
  }
  if (type === "vendor" && (typeof raw.org !== "string" || !raw.org.trim())) {
    return { error: "Venue name is required" };
  }

  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

  return {
    lead: {
      type,
      phone,
      name: str(raw.name),
      org: str(raw.org),
      transport: str(raw.transport),
      lang: str(raw.lang),
      source: str(raw.source),
    },
  };
}

const TYPE_LABEL: Record<LeadType, string> = {
  vendor: "🏪 Restaurant / vendor",
  courier: "🛵 Courier",
  newsletter: "📩 Newsletter signup",
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatMessage(lead: Lead): string {
  const lines: string[] = [`<b>New ZBR lead</b>`, TYPE_LABEL[lead.type]];
  if (lead.org) lines.push(`Venue: ${escapeHtml(lead.org)}`);
  if (lead.name) lines.push(`Name: ${escapeHtml(lead.name)}`);
  lines.push(`Phone: ${escapeHtml(lead.phone)}`);
  if (lead.transport) lines.push(`Transport: ${escapeHtml(lead.transport)}`);
  if (lead.lang) lines.push(`Language: ${escapeHtml(lead.lang)}`);
  if (lead.source) lines.push(`Source: ${escapeHtml(lead.source)}`);
  return lines.join("\n");
}

/**
 * Validates the payload and forwards it to Telegram.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.
 */
export async function handleLead(input: unknown): Promise<LeadResult> {
  const parsed = validateLead(input);
  if ("error" in parsed) return { status: 400, body: { ok: false, error: parsed.error } };

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { status: 500, body: { ok: false, error: "Lead delivery is not configured" } };
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(parsed.lead),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      return { status: 502, body: { ok: false, error: "Telegram rejected the message" } };
    }
    return { status: 200, body: { ok: true } };
  } catch {
    return { status: 502, body: { ok: false, error: "Could not reach Telegram" } };
  }
}

interface ReqLike {
  method?: string;
  body?: unknown;
}
interface ResLike {
  status: (code: number) => ResLike;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export default async function handler(req: ReqLike, res: ResLike): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  // Vercel parses JSON bodies automatically; fall back to parsing a raw string.
  let payload: unknown = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      res.status(400).json({ ok: false, error: "Invalid JSON" });
      return;
    }
  }

  const result = await handleLead(payload);
  res.status(result.status).json(result.body);
}
