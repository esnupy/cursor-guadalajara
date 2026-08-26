import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

import { normalizeEmail } from '@/lib/auth/grants';

export { hashTempAccessCode, verifyTempAccessCode } from '@/lib/auth/temp-access-code';

// TODO: Remove this temporary email+code login once GitHub OAuth via Neon Auth
// is restored. Switch Vercel DATABASE_URL and NEON_AUTH_BASE_URL together from
// the development branch (ep-snowy-tree) to main (ep-red-queen). See lib/auth/server.ts.

const TEMP_SESSION_COOKIE = 'admin_temp_session';
const TEMP_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type TempSessionPayload = {
	email: string;
	exp: number;
};

function getTempSessionSecret(): string {
	const secret = process.env.NEON_AUTH_COOKIE_SECRET;
	if (!secret) {
		throw new Error('NEON_AUTH_COOKIE_SECRET must be set');
	}
	return secret;
}

function signPayload(payload: string): string {
	return createHmac('sha256', getTempSessionSecret()).update(payload).digest('base64url');
}

function encodeTempSession(email: string): string {
	const payload: TempSessionPayload = {
		email: normalizeEmail(email),
		exp: Date.now() + TEMP_SESSION_TTL_MS,
	};
	const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
	return `${encoded}.${signPayload(encoded)}`;
}

function decodeTempSession(value: string): TempSessionPayload | null {
	const [encoded, signature] = value.split('.');
	if (!encoded || !signature) {
		return null;
	}

	const expected = signPayload(encoded);
	const sigBuffer = Buffer.from(signature);
	const expectedBuffer = Buffer.from(expected);

	if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
		return null;
	}

	try {
		const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as TempSessionPayload;
		if (!payload.email || !payload.exp || payload.exp < Date.now()) {
			return null;
		}
		return payload;
	} catch {
		return null;
	}
}

export async function getTempSessionEmail(): Promise<string | null> {
	const cookieStore = await cookies();
	const value = cookieStore.get(TEMP_SESSION_COOKIE)?.value;
	if (!value) {
		return null;
	}

	const payload = decodeTempSession(value);
	return payload?.email ?? null;
}

export async function setTempSession(email: string): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set(TEMP_SESSION_COOKIE, encodeTempSession(email), {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		maxAge: TEMP_SESSION_TTL_MS / 1000,
	});
}

export async function clearTempSession(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete(TEMP_SESSION_COOKIE);
}
