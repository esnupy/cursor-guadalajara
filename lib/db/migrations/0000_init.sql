CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE "public"."access_role" AS ENUM('super_admin', 'ambassador', 'guest');

CREATE TABLE "access_grants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" "citext" NOT NULL,
	"role" "access_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by_email" text,
	CONSTRAINT "access_grants_email_unique" UNIQUE("email")
);
