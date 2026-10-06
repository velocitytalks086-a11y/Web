import type { Config, Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { isAdmin, unauthorized, uid } from "../../lib/admin.js";

const MAX_BYTES = 4 * 1024 * 1024;

export default async (req: Request, context: Context) => {
  const store = getStore({ name: "product-images", consistency: "strong" });
  const key = context.params.key;

  if (req.method === "GET" && key) {
    const res = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!res) return new Response("Not found", { status: 404 });
    return new Response(res.data, {
      headers: {
        "content-type": String(res.metadata.contentType || "application/octet-stream"),
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  }

  if (req.method === "POST") {
    if (!isAdmin(req)) return unauthorized();
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) return Response.json({ error: "Images only" }, { status: 400 });
    const data = await req.arrayBuffer();
    if (data.byteLength > MAX_BYTES) return Response.json({ error: "Image must be under 4 MB" }, { status: 413 });
    const newKey = uid();
    await store.set(newKey, data, { metadata: { contentType } });
    return Response.json({ url: `/api/images/${newKey}` }, { status: 201 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = { path: ["/api/images", "/api/images/:key"] };
