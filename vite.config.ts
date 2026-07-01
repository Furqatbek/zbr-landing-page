import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";
import { handleLead } from "./api/_lead.ts";

// Makes POST /api/lead work under `vite dev` / `vite preview` by running the
// same handler the serverless function uses in production.
function leadDevApi(): Plugin {
  const middleware = async (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void,
  ) => {
    if (req.url !== "/api/lead") return next();
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
      return;
    }
    let raw = "";
    for await (const chunk of req) raw += chunk;
    let payload: unknown = {};
    try {
      payload = raw ? JSON.parse(raw) : {};
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Invalid JSON" }));
      return;
    }
    const result = await handleLead(payload);
    res.statusCode = result.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.body));
  };

  return {
    name: "zbr-lead-dev-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), leadDevApi()],
});
