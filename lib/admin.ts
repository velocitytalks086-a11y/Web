import { timingSafeEqual } from "node:crypto";

// Set ADMIN_CODE in the Netlify environment variables. The fallback keeps the
// existing demo code working until a private code is configured.
const FALLBACK_CODE = "2513";

export function isAdmin(req: Request): boolean {
  const expected = Netlify.env.get("ADMIN_CODE") || FALLBACK_CODE;
  const given = req.headers.get("x-admin-code") || "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const unauthorized = () => Response.json({ error: "Unauthorized" }, { status: 401 });

export const uid = () => "v" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
