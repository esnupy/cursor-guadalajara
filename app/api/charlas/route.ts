import { NextResponse } from 'next/server';

import { persistCharlaSubmission } from '@/lib/charlas/persist';
import { consumeCharlasRateLimit } from '@/lib/charlas/rate-limit';
import { validateCharlaSubmission } from '@/lib/charlas/validate';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

const jsonResponse = (body: { ok: true } | { ok: false; error: string }, status: number) =>
	NextResponse.json(body, { status, headers: corsHeaders });

const getClientKey = (request: Request): string => {
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		return forwarded.split(',')[0]?.trim() || 'unknown';
	}
	return request.headers.get('x-real-ip') ?? 'unknown';
};

/**
 * Allows Cursor agents to preflight POST /api/charlas from any origin.
 */
export const OPTIONS = () => new NextResponse(null, { status: 204, headers: corsHeaders });

/**
 * Accepts speaker applications posted by Cursor agents following /charlas.md.
 */
export const POST = async (request: Request) => {
	if (!consumeCharlasRateLimit(getClientKey(request))) {
		return jsonResponse({ ok: false, error: 'Demasiados intentos. Espera un minuto y vuelve a enviar.' }, 429);
	}

	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'El cuerpo no es JSON válido' }, 400);
	}

	const result = validateCharlaSubmission(payload);
	if (!result.ok) {
		return jsonResponse({ ok: false, error: result.error }, 400);
	}

	try {
		await persistCharlaSubmission(result.submission);
	} catch (error) {
		console.error('Charla submission failed', error);
		return jsonResponse({ ok: false, error: 'No se pudo guardar la postulación. Intenta de nuevo.' }, 500);
	}

	return jsonResponse({ ok: true }, 200);
};
