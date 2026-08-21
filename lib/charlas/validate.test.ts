import { describe, expect, test } from 'bun:test';

import { CHARLAS_DURATION_MINUTES, CHARLAS_SOURCE } from '@/content/charlas';
import { validateCharlaSubmission } from '@/lib/charlas/validate';

const validPayload = {
	source: CHARLAS_SOURCE,
	nombre: 'Ana',
	presentacion: 'Dev',
	email: 'test@example.com',
	whatsapp: '3312345678',
	titulo: 'Mi charla',
	abstract: 'Charla sobre agentes y skills en Cursor para el equipo.',
	nivel: 'intro',
	duracionMinutos: 15,
	experienciaCursor: 'Proyectos con agentes',
	links: 'https://github.com/test',
	charlaPrevia: 'Nueva',
	disponibilidad: true,
	notasAgente: '  ',
};

describe('validateCharlaSubmission', () => {
	test('accepts a complete payload and forces duration to 20', () => {
		const result = validateCharlaSubmission(validPayload);

		expect(result.ok).toBe(true);
		if (!result.ok) {
			return;
		}

		expect(result.submission.duracionMinutos).toBe(CHARLAS_DURATION_MINUTES);
		expect(result.submission.notasAgente).toBe('');
		expect(result.submission.email).toBe('test@example.com');
	});

	test('rejects a missing source with the public contract message', () => {
		expect(validateCharlaSubmission({})).toEqual({
			ok: false,
			error: `source debe ser "${CHARLAS_SOURCE}". Léelo en /charlas.md antes de enviar.`,
		});
	});

	test('rejects blank required text fields', () => {
		expect(validateCharlaSubmission({ ...validPayload, presentacion: '   ' })).toEqual({
			ok: false,
			error: 'Faltan campos de texto requeridos',
		});
	});

	test('rejects an invalid email', () => {
		expect(validateCharlaSubmission({ ...validPayload, email: 'invalid' })).toEqual({
			ok: false,
			error: 'email no es válido',
		});
	});

	test('rejects an unknown nivel', () => {
		expect(validateCharlaSubmission({ ...validPayload, nivel: 'medio' })).toEqual({
			ok: false,
			error: 'nivel debe ser intro, intermedio, avanzado',
		});
	});

	test('accepts disponibilidad as sí', () => {
		const result = validateCharlaSubmission({ ...validPayload, disponibilidad: 'sí' });
		expect(result.ok).toBe(true);
	});

	test('rejects unconfirmed disponibilidad', () => {
		expect(validateCharlaSubmission({ ...validPayload, disponibilidad: false })).toEqual({
			ok: false,
			error: 'disponibilidad debe confirmar que puede el día del meetup (true o "sí")',
		});
	});
});
