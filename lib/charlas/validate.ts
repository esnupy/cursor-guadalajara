import { CHARLAS_DURATION_MINUTES, CHARLAS_NIVELES, CHARLAS_SOURCE, type CharlaNivel } from '@/content/charlas';

const REQUIRED_TEXT_FIELDS = [
	'nombre',
	'presentacion',
	'email',
	'whatsapp',
	'titulo',
	'abstract',
	'experienciaCursor',
	'links',
	'charlaPrevia',
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CharlaSubmission = {
	source: typeof CHARLAS_SOURCE;
	nombre: string;
	presentacion: string;
	email: string;
	whatsapp: string;
	titulo: string;
	abstract: string;
	nivel: CharlaNivel;
	duracionMinutos: typeof CHARLAS_DURATION_MINUTES;
	experienciaCursor: string;
	links: string;
	charlaPrevia: string;
	disponibilidad: true;
	notasAgente: string;
};

export type CharlaValidationResult = { ok: true; submission: CharlaSubmission } | { ok: false; error: string };

const asRecord = (value: unknown): Record<string, unknown> | null => {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return null;
	}
	return value as Record<string, unknown>;
};

const readTrimmedString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const isConfirmedAvailability = (value: unknown): boolean => {
	if (value === true) {
		return true;
	}
	if (typeof value !== 'string') {
		return false;
	}
	const normalized = value.trim().toLowerCase();
	return normalized === 'sí' || normalized === 'si';
};

const isCharlaNivel = (value: string): value is CharlaNivel => CHARLAS_NIVELES.includes(value as CharlaNivel);

/**
 * Validates a speaker application payload against the public /charlas.md contract.
 */
export const validateCharlaSubmission = (value: unknown): CharlaValidationResult => {
	const body = asRecord(value);
	if (!body) {
		return { ok: false, error: 'El cuerpo no es JSON válido' };
	}

	if (body.source !== CHARLAS_SOURCE) {
		return {
			ok: false,
			error: `source debe ser "${CHARLAS_SOURCE}". Léelo en /charlas.md antes de enviar.`,
		};
	}

	const fields = Object.fromEntries(
		REQUIRED_TEXT_FIELDS.map((field) => [field, readTrimmedString(body[field])]),
	) as Record<(typeof REQUIRED_TEXT_FIELDS)[number], string>;

	if (REQUIRED_TEXT_FIELDS.some((field) => fields[field].length === 0)) {
		return { ok: false, error: 'Faltan campos de texto requeridos' };
	}

	if (!EMAIL_PATTERN.test(fields.email)) {
		return { ok: false, error: 'email no es válido' };
	}

	const nivel = readTrimmedString(body.nivel).toLowerCase();
	if (!isCharlaNivel(nivel)) {
		return { ok: false, error: 'nivel debe ser intro, intermedio, avanzado' };
	}

	if (!isConfirmedAvailability(body.disponibilidad)) {
		return {
			ok: false,
			error: 'disponibilidad debe confirmar que puede el día del meetup (true o "sí")',
		};
	}

	return {
		ok: true,
		submission: {
			source: CHARLAS_SOURCE,
			nombre: fields.nombre,
			presentacion: fields.presentacion,
			email: fields.email,
			whatsapp: fields.whatsapp,
			titulo: fields.titulo,
			abstract: fields.abstract,
			nivel,
			duracionMinutos: CHARLAS_DURATION_MINUTES,
			experienciaCursor: fields.experienciaCursor,
			links: fields.links,
			charlaPrevia: fields.charlaPrevia,
			disponibilidad: true,
			notasAgente: readTrimmedString(body.notasAgente),
		},
	};
};
