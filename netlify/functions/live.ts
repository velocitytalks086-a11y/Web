import type { Config } from "@netlify/functions";
import { versions } from "../../lib/sync.js";

// Server-Sent Events stream. Each open page holds one connection and receives
// an event as soon as products or requests change. Connections are recycled
// periodically; the browser's EventSource reconnects automatically.
const CHECK_MS = 1000;
const STREAM_MS = 25000;

export default async (req: Request) => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (s: string) => controller.enqueue(encoder.encode(s));
      const end = Date.now() + STREAM_MS;
      let last = "";
      send("retry: 1000\n\n");
      try {
        while (!req.signal.aborted && Date.now() < end) {
          const v = JSON.stringify(await versions());
          if (v !== last) {
            last = v;
            send(`data: ${v}\n\n`);
          } else {
            send(": ping\n\n");
          }
          await new Promise((r) => setTimeout(r, CHECK_MS));
        }
      } catch (e) {
        console.error("Live stream error", e);
      }
      try { controller.close(); } catch {}
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-store, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    },
  });
};

export const config: Config = { path: "/api/live", method: "GET" };
