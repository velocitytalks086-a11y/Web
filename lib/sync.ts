import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { syncState } from "../db/schema.js";

export type Scope = "products" | "requests";

// Records that a data set changed so live connections push the update.
export async function bump(scope: Scope) {
  await db
    .insert(syncState)
    .values({ scope, version: 1 })
    .onConflictDoUpdate({
      target: syncState.scope,
      set: { version: sql`${syncState.version} + 1`, updatedAt: new Date() },
    });
}

export async function versions() {
  const rows = await db.select().from(syncState);
  const out: Record<Scope, number> = { products: 0, requests: 0 };
  for (const r of rows) if (r.scope in out) out[r.scope as Scope] = r.version;
  return out;
}
