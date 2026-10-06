CREATE TABLE "sync_state" (
	"scope" text PRIMARY KEY,
	"version" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
