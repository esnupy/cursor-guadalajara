CREATE TABLE IF NOT EXISTS "charla_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" text NOT NULL,
	"presentacion" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp" text NOT NULL,
	"titulo" text NOT NULL,
	"abstract" text NOT NULL,
	"nivel" text NOT NULL,
	"duracion_minutos" integer NOT NULL,
	"experiencia_cursor" text NOT NULL,
	"links" text NOT NULL,
	"charla_previa" text NOT NULL,
	"disponibilidad" boolean NOT NULL,
	"notas_agente" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
