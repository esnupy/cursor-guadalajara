import { describe, expect, test } from 'bun:test';

import { parseCsv } from '@/lib/caps/csv';
import { isAstrazenecaEmail, isValidCapEmail, normalizeCapEmail } from '@/lib/caps/email';
import { isValidHandle, normalizeHandle } from '@/lib/caps/handle';
import { validateCapClaimInput } from '@/lib/caps/validate';

describe('normalizeHandle', () => {
	test('strips @, URLs, and casing', () => {
		expect(normalizeHandle('  @Juanda ')).toBe('juanda');
		expect(normalizeHandle('https://cursor.com/@Juanda')).toBe('juanda');
		expect(normalizeHandle('cursor.com/@juanda/extra')).toBe('juanda');
	});
});

describe('isValidHandle', () => {
	test('accepts lowercase handles with single hyphens', () => {
		expect(isValidHandle('juanda')).toBe(true);
		expect(isValidHandle('juan-da')).toBe(true);
	});

	test('rejects short, spaced, or doubled hyphen handles', () => {
		expect(isValidHandle('ab')).toBe(false);
		expect(isValidHandle('juan--da')).toBe(false);
		expect(isValidHandle('juan da')).toBe(false);
	});
});

describe('cap email', () => {
	test('normalizes and detects AstraZeneca', () => {
		expect(normalizeCapEmail('  Foo@AstraZeneca.COM ')).toBe('foo@astrazeneca.com');
		expect(isAstrazenecaEmail('foo@astrazeneca.com')).toBe(true);
		expect(isAstrazenecaEmail('foo@gmail.com')).toBe(false);
		expect(isValidCapEmail('not-an-email')).toBe(false);
	});
});

describe('validateCapClaimInput', () => {
	test('accepts a luma-shaped payload', () => {
		const result = validateCapClaimInput({
			email: '  Test@Example.com ',
			handle: 'https://cursor.com/@Juan-Da',
			name: '',
		});
		expect(result.ok).toBe(true);
		if (!result.ok) {
			return;
		}
		expect(result.draft.email).toBe('test@example.com');
		expect(result.draft.handle).toBe('juan-da');
		expect(result.draft.needsName).toBe(false);
	});

	test('marks AstraZeneca emails as needing a name', () => {
		const result = validateCapClaimInput({
			email: 'ana@astrazeneca.com',
			handle: 'ana-az',
			name: 'Ana',
		});
		expect(result.ok).toBe(true);
		if (!result.ok) {
			return;
		}
		expect(result.draft.needsName).toBe(true);
		expect(result.draft.name).toBe('Ana');
	});

	test('rejects an invalid handle', () => {
		expect(validateCapClaimInput({ email: 'a@b.com', handle: 'x', name: '' })).toEqual({
			ok: false,
			error: 'El handle no es válido. Usa letras, números y guiones, mínimo 3 caracteres.',
		});
	});
});

describe('parseCsv', () => {
	test('reads quoted commas and trims cells', () => {
		const rows = parseCsv('name,email\n"Doe, Jane",jane@example.com\n');
		expect(rows).toEqual([{ name: 'Doe, Jane', email: 'jane@example.com' }]);
	});
});
