// Serverless function (Vercel-compatible Node runtime) that forwards a captured
// lead to Telegram. Deploy alongside the static Vite build; the frontend POSTs
// JSON to /api/lead. Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as env vars.
import { handleLead } from "./_lead.ts";

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
