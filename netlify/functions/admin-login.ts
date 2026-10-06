import type { Config } from "@netlify/functions";
import { isAdmin, unauthorized } from "../../lib/admin.js";

export default async (req: Request) => {
  if (!isAdmin(req)) return unauthorized();
  return Response.json({ ok: true });
};

export const config: Config = { path: "/api/admin/login", method: "POST" };
