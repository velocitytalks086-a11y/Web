import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text().primaryKey(),
  name: text().notNull(),
  category: text().notNull().default("Application"),
  description: text().notNull().default(""),
  access: text().notNull().default("request"),
  button: text().notNull().default("Request access"),
  glyph: text().notNull().default("✳"),
  image: text().notNull().default(""),
  link: text().notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const requests = pgTable("requests", {
  id: text().primaryKey(),
  name: text().notNull(),
  contact: text().notNull(),
  productId: text("product_id").notNull().default(""),
  productName: text("product_name").notNull().default(""),
  type: text().notNull().default(""),
  message: text().notNull().default(""),
  status: text().notNull().default("Pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// One row per data set; the version is bumped on every write so open pages
// can be told about changes the moment they happen.
export const syncState = pgTable("sync_state", {
  scope: text().primaryKey(),
  version: integer().notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
