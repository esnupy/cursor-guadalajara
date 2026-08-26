import { describe, expect, test } from 'bun:test';

import { hashTempAccessCode, verifyTempAccessCode } from '@/lib/auth/temp-access-code';

describe('verifyTempAccessCode', () => {
	test('rejects empty and wrong codes', () => {
		expect(verifyTempAccessCode('')).toBe(false);
		expect(verifyTempAccessCode('not-the-code')).toBe(false);
	});

	test('hashTempAccessCode is stable and hex-encoded', () => {
		const hash = hashTempAccessCode('example');
		expect(hash).toBe(hashTempAccessCode('example'));
		expect(hash).toMatch(/^[0-9a-f]{64}$/);
		expect(hash).toBe(hashTempAccessCode('  example  '));
	});
});
