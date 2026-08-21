import { describe, expect, test } from 'bun:test';

import { consumeCharlasRateLimit } from '@/lib/charlas/rate-limit';

describe('consumeCharlasRateLimit', () => {
	test('allows five attempts and blocks the sixth inside one minute', () => {
		const key = `test-${crypto.randomUUID()}`;
		const now = 1_000_000;

		expect(consumeCharlasRateLimit(key, now)).toBe(true);
		expect(consumeCharlasRateLimit(key, now + 1)).toBe(true);
		expect(consumeCharlasRateLimit(key, now + 2)).toBe(true);
		expect(consumeCharlasRateLimit(key, now + 3)).toBe(true);
		expect(consumeCharlasRateLimit(key, now + 4)).toBe(true);
		expect(consumeCharlasRateLimit(key, now + 5)).toBe(false);
		expect(consumeCharlasRateLimit(key, now + 60_000)).toBe(true);
	});
});
