import { describe, expect, test } from 'bun:test';

import { CAP_LIMIT } from '@/lib/caps/constants';
import { padBoardSlots, toCapBoardEntries, type CapBoardClaim } from '@/lib/caps/board';

const claim = (overrides: Partial<CapBoardClaim> & Pick<CapBoardClaim, 'name'>): CapBoardClaim => ({
	handle: overrides.handle ?? overrides.name.toLowerCase(),
	status: overrides.status ?? 'queued',
	name: overrides.name,
});

describe('toCapBoardEntries', () => {
	test('drops skipped claims and numbers the rest from 1', () => {
		const entries = toCapBoardEntries([
			claim({ name: 'Ada', status: 'queued' }),
			claim({ name: 'Ben', status: 'skipped' }),
			claim({ name: 'Ciro', status: 'delivered' }),
		]);

		expect(entries).toEqual([
			{ slot: 1, name: 'Ada', handle: 'ada', status: 'queued' },
			{ slot: 2, name: 'Ciro', handle: 'ciro', status: 'delivered' },
		]);
	});

	test('keeps only the first 35 visible claims', () => {
		const claims = Array.from({ length: CAP_LIMIT + 5 }, (_, index) =>
			claim({ name: `Persona ${index + 1}`, handle: `p${index + 1}` }),
		);

		const entries = toCapBoardEntries(claims);

		expect(entries).toHaveLength(CAP_LIMIT);
		expect(entries[0]?.slot).toBe(1);
		expect(entries[CAP_LIMIT - 1]?.slot).toBe(CAP_LIMIT);
		expect(entries[CAP_LIMIT - 1]?.name).toBe(`Persona ${CAP_LIMIT}`);
	});
});

describe('padBoardSlots', () => {
	test('fills remaining spots with empty numbered cells', () => {
		const slots = padBoardSlots([
			{ slot: 1, name: 'Ada', handle: 'ada', status: 'queued' },
			{ slot: 2, name: 'Ciro', handle: 'ciro', status: 'delivered' },
		]);

		expect(slots).toHaveLength(CAP_LIMIT);
		expect(slots[0]?.entry?.name).toBe('Ada');
		expect(slots[1]?.entry?.status).toBe('delivered');
		expect(slots[2]).toEqual({ slot: 3, entry: null });
		expect(slots[CAP_LIMIT - 1]).toEqual({ slot: CAP_LIMIT, entry: null });
	});
});
