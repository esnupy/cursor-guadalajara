import { describe, expect, test } from 'bun:test';

import { normalizeEmail, pickHighestRoleGrant } from '@/lib/auth/grants';
import type { AccessGrant } from '@/lib/db/schema';

function makeGrant(overrides: Partial<AccessGrant> & Pick<AccessGrant, 'email' | 'role'>): AccessGrant {
	return {
		id: overrides.id ?? crypto.randomUUID(),
		createdAt: overrides.createdAt ?? new Date(),
		updatedAt: overrides.updatedAt ?? new Date(),
		createdByEmail: overrides.createdByEmail ?? null,
		...overrides,
	};
}

describe('normalizeEmail', () => {
	test('lowercases and trims', () => {
		expect(normalizeEmail('  Test@Example.COM ')).toBe('test@example.com');
	});
});

describe('pickHighestRoleGrant', () => {
	test('prefers super_admin over ambassador and guest', () => {
		const grants = [
			makeGrant({ email: 'guest@example.com', role: 'guest' }),
			makeGrant({ email: 'admin@example.com', role: 'super_admin' }),
			makeGrant({ email: 'amb@example.com', role: 'ambassador' }),
		];

		expect(pickHighestRoleGrant(grants)?.role).toBe('super_admin');
	});

	test('returns null for empty list', () => {
		expect(pickHighestRoleGrant([])).toBeNull();
	});
});
