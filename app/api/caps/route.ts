import { NextResponse } from 'next/server';

import { joinCapQueue, listCapBoard } from '@/lib/caps/persist';
import { validateCapClaimInput } from '@/lib/caps/validate';

type OkBody = { ok: true; position: number; capLimit: number; alreadyJoined: boolean };
type ErrorBody = { ok: false; error: string };

const jsonResponse = (body: OkBody | ErrorBody, status: number) => NextResponse.json(body, { status });

const noStore = { 'Cache-Control': 'no-store' } as const;

/**
 * Public board: first 35 queued or delivered claims. No emails.
 */
export const GET = async () => {
	try {
		const snapshot = await listCapBoard();
		return NextResponse.json(snapshot, { headers: noStore });
	} catch (error) {
		console.error('Cap board list failed', error);
		return NextResponse.json({ error: 'No se pudo cargar la fila' }, { status: 500, headers: noStore });
	}
};

/**
 * Joins the meetup cap queue with a Luma or AstraZeneca email plus a Cursor handle.
 */
export const POST = async (request: Request) => {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'El cuerpo no es JSON válido' }, 400);
	}

	const result = validateCapClaimInput(payload);
	if (!result.ok) {
		return jsonResponse({ ok: false, error: result.error }, 400);
	}

	try {
		const joined = await joinCapQueue(result.draft);
		if (!joined.ok) {
			return jsonResponse({ ok: false, error: joined.error }, 400);
		}
		return jsonResponse(joined, 200);
	} catch (error) {
		console.error('Cap queue join failed', error);
		return jsonResponse({ ok: false, error: 'No se pudo guardar tu lugar. Intenta de nuevo.' }, 500);
	}
};
