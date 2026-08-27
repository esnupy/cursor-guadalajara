import { and, asc, count, eq, inArray } from 'drizzle-orm';

import { toCapBoardEntries, type CapBoardSnapshot } from '@/lib/caps/board';
import { CAP_LIMIT } from '@/lib/caps/constants';
import { isAstrazenecaEmail } from '@/lib/caps/email';
import type { CapClaimDraft } from '@/lib/caps/validate';
import { getDb } from '@/lib/db';
import { capClaims, meetupGuests, type CapClaim, type CapClaimSource } from '@/lib/db/schema';

export type JoinQueueResult =
	{ ok: true; position: number; capLimit: number; alreadyJoined: boolean } | { ok: false; error: string };

const INELIGIBLE_EMAIL =
	'Ese correo no está en la lista del meetup. Si vienes de AstraZeneca, usa tu correo @astrazeneca.com.';
const AZ_NAME_REQUIRED = 'Con correo de AstraZeneca necesitamos tu nombre.';
const HANDLE_TAKEN = 'Ese handle ya está en la fila con otro correo.';

const isUniqueViolation = (error: unknown, constraint: string): boolean => {
	const message = error instanceof Error ? error.message : String(error);
	return message.includes(constraint);
};

const queuePositionFor = async (claimId: string): Promise<number> => {
	const claims = await getDb()
		.select({ id: capClaims.id })
		.from(capClaims)
		.orderBy(asc(capClaims.createdAt), asc(capClaims.id));
	const index = claims.findIndex((row) => row.id === claimId);
	return index === -1 ? claims.length : index + 1;
};

/**
 * Inserts into the cap queue, or returns the existing place if this email already joined.
 */
export const joinCapQueue = async (draft: CapClaimDraft): Promise<JoinQueueResult> => {
	const db = getDb();
	const [guest] = await db.select().from(meetupGuests).where(eq(meetupGuests.email, draft.email)).limit(1);

	let source: CapClaimSource;
	let name: string;

	if (guest) {
		source = 'luma';
		name = guest.name;
	} else if (isAstrazenecaEmail(draft.email)) {
		if (draft.name.length < 2) {
			return { ok: false, error: AZ_NAME_REQUIRED };
		}
		source = 'astrazeneca';
		name = draft.name;
	} else {
		return { ok: false, error: INELIGIBLE_EMAIL };
	}

	const [existingEmail] = await db.select().from(capClaims).where(eq(capClaims.email, draft.email)).limit(1);
	if (existingEmail) {
		return {
			ok: true,
			position: await queuePositionFor(existingEmail.id),
			capLimit: CAP_LIMIT,
			alreadyJoined: true,
		};
	}

	const [existingHandle] = await db.select().from(capClaims).where(eq(capClaims.handle, draft.handle)).limit(1);
	if (existingHandle) {
		return { ok: false, error: HANDLE_TAKEN };
	}

	try {
		const [inserted] = await db
			.insert(capClaims)
			.values({
				email: draft.email,
				handle: draft.handle,
				name,
				source,
				profilePublic: false, // verified in person at pickup, not at submit
			})
			.returning();

		if (!inserted) {
			return { ok: false, error: 'No se pudo guardar tu lugar. Intenta de nuevo.' };
		}

		return {
			ok: true,
			position: await queuePositionFor(inserted.id),
			capLimit: CAP_LIMIT,
			alreadyJoined: false,
		};
	} catch (error) {
		if (isUniqueViolation(error, 'cap_claims_email_unique')) {
			const [claim] = await db.select().from(capClaims).where(eq(capClaims.email, draft.email)).limit(1);
			if (claim) {
				return {
					ok: true,
					position: await queuePositionFor(claim.id),
					capLimit: CAP_LIMIT,
					alreadyJoined: true,
				};
			}
		}
		if (isUniqueViolation(error, 'cap_claims_handle_unique')) {
			return { ok: false, error: HANDLE_TAKEN };
		}
		throw error;
	}
};

export const listCapQueue = async (): Promise<CapClaim[]> => {
	return getDb().select().from(capClaims).orderBy(asc(capClaims.createdAt), asc(capClaims.id));
};

export const listCapBoard = async (): Promise<CapBoardSnapshot> => {
	const [rows, delivered] = await Promise.all([
		getDb()
			.select({
				name: capClaims.name,
				handle: capClaims.handle,
				status: capClaims.status,
			})
			.from(capClaims)
			.where(inArray(capClaims.status, ['queued', 'delivered']))
			.orderBy(asc(capClaims.createdAt), asc(capClaims.id))
			.limit(CAP_LIMIT),
		countDeliveredCaps(),
	]);

	return {
		capLimit: CAP_LIMIT,
		delivered,
		entries: toCapBoardEntries(rows),
	};
};

export const countDeliveredCaps = async (): Promise<number> => {
	const [row] = await getDb().select({ total: count() }).from(capClaims).where(eq(capClaims.status, 'delivered'));
	return Number(row?.total ?? 0);
};

export const markCapDelivered = async (id: string, resolvedByEmail: string): Promise<void> => {
	const delivered = await countDeliveredCaps();
	if (delivered >= CAP_LIMIT) {
		throw new Error(`Ya se entregaron las ${CAP_LIMIT} gorras`);
	}

	const result = await getDb()
		.update(capClaims)
		.set({
			status: 'delivered',
			resolvedAt: new Date(),
			resolvedByEmail,
		})
		.where(and(eq(capClaims.id, id), inArray(capClaims.status, ['queued', 'skipped'])))
		.returning({ id: capClaims.id });

	if (result.length === 0) {
		if ((await countDeliveredCaps()) >= CAP_LIMIT) {
			throw new Error(`Ya se entregaron las ${CAP_LIMIT} gorras`);
		}
		throw new Error('No se pudo marcar como entregada');
	}
};

export const markCapSkipped = async (id: string, resolvedByEmail: string): Promise<void> => {
	const result = await getDb()
		.update(capClaims)
		.set({
			status: 'skipped',
			resolvedAt: new Date(),
			resolvedByEmail,
		})
		.where(and(eq(capClaims.id, id), eq(capClaims.status, 'queued')))
		.returning({ id: capClaims.id });

	if (result.length === 0) {
		throw new Error('Solo se puede saltar a alguien que sigue en la fila');
	}
};
