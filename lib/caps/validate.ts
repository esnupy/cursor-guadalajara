import { isAstrazenecaEmail, isValidCapEmail, normalizeCapEmail } from '@/lib/caps/email';
import { isValidHandle, normalizeHandle } from '@/lib/caps/handle';

export type CapClaimInput = {
	email: string;
	handle: string;
	name: string;
};

export type CapClaimDraft = {
	email: string;
	handle: string;
	name: string;
	needsName: boolean;
};

export type CapValidationResult = { ok: true; draft: CapClaimDraft } | { ok: false; error: string };

const MAX_NAME_LENGTH = 120;

const asRecord = (value: unknown): Record<string, unknown> | null => {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return null;
	}
	return value as Record<string, unknown>;
};

const readTrimmedString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

/**
 * Validates the public form payload before eligibility or profile lookup.
 */
export const validateCapClaimInput = (value: unknown): CapValidationResult => {
	const body = asRecord(value);
	if (!body) {
		return { ok: false, error: 'El cuerpo no es JSON válido' };
	}

	const email = normalizeCapEmail(readTrimmedString(body.email));
	const handle = normalizeHandle(readTrimmedString(body.handle));
	const name = readTrimmedString(body.name).replace(/\s+/g, ' ');

	if (!isValidCapEmail(email)) {
		return { ok: false, error: 'El correo no es válido' };
	}

	if (!isValidHandle(handle)) {
		return {
			ok: false,
			error: 'El handle no es válido. Usa letras, números y guiones, mínimo 3 caracteres.',
		};
	}

	if (name.length > MAX_NAME_LENGTH) {
		return { ok: false, error: 'El nombre es demasiado largo' };
	}

	return {
		ok: true,
		draft: {
			email,
			handle,
			name,
			needsName: isAstrazenecaEmail(email),
		},
	};
};
