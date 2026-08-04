import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

import { normalizeEmail } from '@/lib/auth/grants';

const DEV_SESSION_COOKIE = 'admin_dev_session';
const DEV_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type DevSessionPayload = {
	email: string;
	exp: number;
};

export function isDevBypassEnabled(): boolean {
	return process.env.NODE_ENV === 'development' && process.env.AUTH_DEV_BYPASS === 'true';
}

function getDevSessionSecret(): string {
	const secret = process.env.DEV_SESSION_SECRET;
	if (!secret || secret.length < 32) {
		throw new Error('DEV_SESSION_SECRET must be at least 32 characters when AUTH_DEV_BYPASS is enabled');
	}
	return secret;
}

function signPayload(payload: string): string {
	return createHmac('sha256', getDevSessionSecret()).update(payload).digest('base64url');
}

function encodeDevSession(email: string): string {
	const payload: DevSessionPayload = {
		email: normalizeEmail(email),
		exp: Date.now() + DEV_SESSION_TTL_MS,
	};
	const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
	return `${encoded}.${signPayload(encoded)}`;
}

function decodeDevSession(value: string): DevSessionPayload | null {
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
		const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as DevSessionPayload;
		if (!payload.email || !payload.exp || payload.exp < Date.now()) {
			return null;
		}
		return payload;
	} catch {
		return null;
	}
}

export async function getDevSessionEmail(): Promise<string | null> {
	if (!isDevBypassEnabled()) {
		return null;
	}

	const cookieStore = await cookies();
	const value = cookieStore.get(DEV_SESSION_COOKIE)?.value;
	if (!value) {
		return null;
	}

	const payload = decodeDevSession(value);
	return payload?.email ?? null;
}

export async function setDevSession(email: string): Promise<void> {
	if (!isDevBypassEnabled()) {
		throw new Error('Dev bypass is not enabled');
	}

	const cookieStore = await cookies();
	cookieStore.set(DEV_SESSION_COOKIE, encodeDevSession(email), {
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		path: '/',
		maxAge: DEV_SESSION_TTL_MS / 1000,
	});
}

export async function clearDevSession(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete(DEV_SESSION_COOKIE);
}

export function getAutoDevEmail(): string | null {
	if (!isDevBypassEnabled()) {
		return null;
	}

	const email = process.env.DEV_USER_EMAIL;
	return email ? normalizeEmail(email) : null;
}
