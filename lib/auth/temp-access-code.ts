import { createHmac, timingSafeEqual } from 'node:crypto';

const ACCESS_CODE_PEPPER = 'cursor-guadalajara-temp-admin-access-code';
const ACCESS_CODE_HMAC_HEX = '239cc894886d68da5643fa54cc0009a0794003ec980c8c43cad635e83711310c';

export function hashTempAccessCode(code: string): string {
	return createHmac('sha256', ACCESS_CODE_PEPPER).update(code.trim()).digest('hex');
}

export function verifyTempAccessCode(code: string): boolean {
	const actual = Buffer.from(hashTempAccessCode(code), 'hex');
	const expected = Buffer.from(ACCESS_CODE_HMAC_HEX, 'hex');
	return actual.length === expected.length && timingSafeEqual(actual, expected);
}
