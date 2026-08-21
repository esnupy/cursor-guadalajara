import { neon } from '@neondatabase/serverless';

import type { CharlaSubmission } from '@/lib/charlas/validate';

const ensureSubmissionsTable = async (sql: ReturnType<typeof neon>): Promise<void> => {
	await sql`
		CREATE TABLE IF NOT EXISTS charla_submissions (
			id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
			nombre text NOT NULL,
			presentacion text NOT NULL,
			email text NOT NULL,
			whatsapp text NOT NULL,
			titulo text NOT NULL,
			abstract text NOT NULL,
			nivel text NOT NULL,
			duracion_minutos integer NOT NULL,
			experiencia_cursor text NOT NULL,
			links text NOT NULL,
			charla_previa text NOT NULL,
			disponibilidad boolean NOT NULL,
			notas_agente text,
			created_at timestamp with time zone DEFAULT now() NOT NULL
		)
	`;
};

/**
 * Inserts the application into Neon, creating the table if needed.
 */
const persistToDatabase = async (submission: CharlaSubmission): Promise<void> => {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error('DATABASE_URL is not set');
	}

	const sql = neon(databaseUrl);
	await ensureSubmissionsTable(sql);
	await sql`
		INSERT INTO charla_submissions (
			nombre,
			presentacion,
			email,
			whatsapp,
			titulo,
			abstract,
			nivel,
			duracion_minutos,
			experiencia_cursor,
			links,
			charla_previa,
			disponibilidad,
			notas_agente
		) VALUES (
			${submission.nombre},
			${submission.presentacion},
			${submission.email},
			${submission.whatsapp},
			${submission.titulo},
			${submission.abstract},
			${submission.nivel},
			${submission.duracionMinutos},
			${submission.experienciaCursor},
			${submission.links},
			${submission.charlaPrevia},
			${submission.disponibilidad},
			${submission.notasAgente || null}
		)
	`;
};

/**
 * Forwards the application to an optional private webhook.
 */
const persistToWebhook = async (submission: CharlaSubmission): Promise<void> => {
	const webhookUrl = process.env.CHARLAS_WEBHOOK_URL;
	if (!webhookUrl) {
		return;
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};
	const token = process.env.CHARLAS_WEBHOOK_TOKEN;
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers,
		body: JSON.stringify(submission),
	});

	if (!response.ok) {
		throw new Error(`CHARLAS_WEBHOOK_URL responded ${response.status}`);
	}
};

/**
 * Stores a validated speaker application in Neon and, when configured, a webhook.
 */
export const persistCharlaSubmission = async (submission: CharlaSubmission): Promise<void> => {
	const hasDatabase = Boolean(process.env.DATABASE_URL);
	const hasWebhook = Boolean(process.env.CHARLAS_WEBHOOK_URL);

	if (!hasDatabase && !hasWebhook) {
		throw new Error('Configure DATABASE_URL or CHARLAS_WEBHOOK_URL to receive submissions');
	}

	if (hasDatabase) {
		await persistToDatabase(submission);
	}

	if (hasWebhook) {
		await persistToWebhook(submission);
	}
};
