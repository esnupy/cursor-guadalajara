CREATE TYPE "public"."cap_claim_status" AS ENUM('queued', 'delivered', 'skipped');

CREATE TYPE "public"."cap_claim_source" AS ENUM('luma', 'astrazeneca');

CREATE TABLE IF NOT EXISTS "meetup_guests" (
	"email" "citext" PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"luma_guest_id" text,
	"approval_status" text
);

CREATE TABLE IF NOT EXISTS "cap_claims" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" "citext" NOT NULL,
	"handle" text NOT NULL,
	"name" text NOT NULL,
	"source" "cap_claim_source" NOT NULL,
	"profile_public" boolean NOT NULL,
	"status" "cap_claim_status" DEFAULT 'queued' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone,
	"resolved_by_email" text,
	CONSTRAINT "cap_claims_email_unique" UNIQUE("email"),
	CONSTRAINT "cap_claims_handle_unique" UNIQUE("handle")
);
