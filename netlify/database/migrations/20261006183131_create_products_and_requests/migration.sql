CREATE TABLE "products" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"category" text DEFAULT 'Application' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"access" text DEFAULT 'request' NOT NULL,
	"button" text DEFAULT 'Request access' NOT NULL,
	"glyph" text DEFAULT '✳' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"link" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "requests" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"contact" text NOT NULL,
	"product_id" text DEFAULT '' NOT NULL,
	"product_name" text DEFAULT '' NOT NULL,
	"type" text DEFAULT '' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
