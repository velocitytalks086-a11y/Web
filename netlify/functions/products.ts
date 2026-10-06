import type { Config, Context } from "@netlify/functions";
import { asc, eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";
import { bump } from "../../lib/sync.js";
import { isAdmin, unauthorized, uid, str } from "../../lib/admin.js";

const ACCESS = ["request", "direct", "both"];

function clean(body: any) {
  return {
    name: str(body.name, 90),
    category: str(body.category, 60) || "Application",
    description: str(body.description, 1000),
    access: ACCESS.includes(body.access) ? body.access : "request",
    button: str(body.button, 40) || "Request access",
    image: str(body.image, 2000),
    link: str(body.link, 2000),
  };
}

export default async (req: Request, context: Context) => {
  const id = context.params.id;

  if (req.method === "GET") {
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder), asc(products.createdAt));
    return Response.json(rows, { headers: { "cache-control": "no-store" } });
  }

  if (!isAdmin(req)) return unauthorized();

  if (req.method === "POST") {
    const p = clean(await req.json());
    if (!p.name) return Response.json({ error: "Name is required" }, { status: 400 });
    const [{ next }] = await db.select({ next: sql<number>`coalesce(max(${products.sortOrder}), 0) + 1` }).from(products);
    const [row] = await db.insert(products).values({ id: uid(), ...p, sortOrder: Number(next) }).returning();
    await bump("products");
    return Response.json(row, { status: 201 });
  }

  if (req.method === "PUT" && id) {
    const p = clean(await req.json());
    if (!p.name) return Response.json({ error: "Name is required" }, { status: 400 });
    const [row] = await db.update(products).set({ ...p, updatedAt: new Date() }).where(eq(products.id, id)).returning();
    if (row) await bump("products");
    return row ? Response.json(row) : Response.json({ error: "Not found" }, { status: 404 });
  }

  if (req.method === "DELETE" && id) {
    await db.delete(products).where(eq(products.id, id));
    await bump("products");
    return Response.json({ ok: true });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = { path: ["/api/products", "/api/products/:id"] };
