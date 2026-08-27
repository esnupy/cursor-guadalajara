'use server';

import { revalidatePath } from 'next/cache';

import { capGiveaway } from '@/content/caps';
import { CAP_LIMIT } from '@/lib/caps/constants';
import { countDeliveredCaps, listCapQueue, markCapDelivered, markCapSkipped } from '@/lib/caps/persist';
import { cursorProfileUrl } from '@/lib/caps/profile';
import { requireRole } from '@/lib/auth/session';
import type { CapClaimSource, CapClaimStatus } from '@/lib/db/schema';

const refreshCapViews = () => {
	revalidatePath('/admin/caps');
	revalidatePath(capGiveaway.boardPath);
};

export type CapQueueRow = {
	id: string;
	position: number;
	name: string;
	email: string;
	handle: string;
	profileUrl: string;
	source: CapClaimSource;
	status: CapClaimStatus;
	createdAt: string;
};

export type CapQueueSnapshot = {
	capLimit: number;
	delivered: number;
	rows: CapQueueRow[];
};

export async function getCapQueue(): Promise<CapQueueSnapshot> {
	await requireRole('ambassador');
	const [claims, delivered] = await Promise.all([listCapQueue(), countDeliveredCaps()]);

	return {
		capLimit: CAP_LIMIT,
		delivered,
		rows: claims.map((claim, index) => ({
			id: claim.id,
			position: index + 1,
			name: claim.name,
			email: claim.email,
			handle: claim.handle,
			profileUrl: cursorProfileUrl(claim.handle),
			source: claim.source,
			status: claim.status,
			createdAt: claim.createdAt.toISOString(),
		})),
	};
}

export async function deliverCap(input: { id: string }) {
	const session = await requireRole('ambassador');
	await markCapDelivered(input.id, session.email);
	refreshCapViews();
}

export async function skipCap(input: { id: string }) {
	const session = await requireRole('ambassador');
	await markCapSkipped(input.id, session.email);
	refreshCapViews();
}
