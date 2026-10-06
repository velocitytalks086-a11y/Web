import type { Config, Context } from "@netlify/functions";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { products, requests } from "../../db/schema.js";
import { bump } from "../../lib/sync.js";
import { isAdmin, unauthorized, uid, str } from "../../lib/admin.js";

const STATUSES = ["Pending", "In review", "Approved", "Closed"];

export default async (req: Request, context: Context) => {
  const id = context.params.id;

  // Anyone can submit a request; only admins can read or manage them.
  if (req.method === "POST") {
    const body = await req.json();
    const r = {
      name: str(body.name, 100),
      contact: str(body.contact, 200),
      productId: str(body.productId, 60),
      type: str(body.type, 60),
      message: str(body.message, 2000),
    };
    if (!r.name || !r.contact) return Response.json({ error: "Name and contact are required" }, { status: 400 });
    const [product] = await db.select().from(products).where(eq(products.id, r.productId));
    if (!product) return Response.json({ error: "Please choose a product" }, { status: 400 });
    const [row] = await db.insert(requests).values({ id: uid(), ...r, productName: product.name }).returning({ id: requests.id });
    await bump("requests");
    return Response.json(row, { status: 201 });
  }

  if (!isAdmin(req)) return unauthorized();

  if (req.method === "GET") {
    const rows = await db.select().from(requests).orderBy(desc(requests.createdAt));
    return Response.json(rows, { headers: { "cache-control": "no-store" } });
  }

  if (req.method === "PATCH" && id) {
    const { status } = await req.json();
    if (!STATUSES.includes(status)) return Response.json({ error: "Invalid status" }, { status: 400 });
    const [row] = await db.update(requests).set({ status, updatedAt: new Date() }).where(eq(requests.id, id)).returning();
    if (row) await bump("requests");
    return row ? Response.json(row) : Response.json({ error: "Not found" }, { status: 404 });
  }

  if (req.method === "DELETE" && id) {
    await db.delete(requests).where(eq(requests.id, id));
    await bump("requests");
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = { path: ["/api/requests", "/api/requests/:id"] };
