import { CAP_LIMIT } from '@/lib/caps/constants';
import type { CapClaimStatus } from '@/lib/db/schema';

export const CAP_BOARD_QUERY_KEY = ['cap-board'] as const;
export const CAP_BOARD_POLL_MS = 30_000;

export type CapBoardStatus = Exclude<CapClaimStatus, 'skipped'>;

export type CapBoardEntry = {
	slot: number;
	name: string;
	handle: string;
	status: CapBoardStatus;
};

export type CapBoardSnapshot = {
	capLimit: number;
	delivered: number;
	entries: CapBoardEntry[];
};

export type CapBoardClaim = {
	name: string;
	handle: string;
	status: CapClaimStatus;
};

export type CapBoardSlot = {
	slot: number;
	entry: CapBoardEntry | null;
};

const isBoardStatus = (status: CapClaimStatus): status is CapBoardStatus =>
	status === 'queued' || status === 'delivered';

export const toCapBoardEntries = (claims: CapBoardClaim[]): CapBoardEntry[] =>
	claims
		.filter((claim): claim is CapBoardClaim & { status: CapBoardStatus } => isBoardStatus(claim.status))
		.slice(0, CAP_LIMIT)
		.map((claim, index) => ({
			slot: index + 1,
			name: claim.name,
			handle: claim.handle,
			status: claim.status,
		}));

export const padBoardSlots = (entries: CapBoardEntry[]): CapBoardSlot[] =>
	Array.from({ length: CAP_LIMIT }, (_, index) => ({
		slot: index + 1,
		entry: entries[index] ?? null,
	}));

export const fetchCapBoard = async (): Promise<CapBoardSnapshot> => {
	const response = await fetch('/api/caps', { cache: 'no-store' });
	if (!response.ok) {
		throw new Error('No se pudo cargar la fila');
	}

	return (await response.json()) as CapBoardSnapshot;
};
