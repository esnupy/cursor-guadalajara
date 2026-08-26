import { createNeonAuth } from '@neondatabase/auth/next/server';

// TODO: Restore GitHub OAuth via Neon Auth on the main branch.
// Production currently uses the Neon development branch for both DATABASE_URL
// and NEON_AUTH_BASE_URL (ep-snowy-tree). Switch both together to main:
// NEON_AUTH_BASE_URL=https://ep-red-queen-awg5wlow.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth
// plus matching NEON_AUTH_COOKIE_SECRET and main DATABASE_URL.
// GitHub callback: {NEON_AUTH_BASE_URL}/callback/github.
// Add https://www.cursorguadalajara.com to that branch's trusted origins.
// Then remove lib/auth/temp-access.ts and the email+code login.

function getAuthConfig() {
	const baseUrl = process.env.NEON_AUTH_BASE_URL;
	const secret = process.env.NEON_AUTH_COOKIE_SECRET;

	if (!baseUrl || !secret) {
		throw new Error('NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be set');
	}

	return { baseUrl, secret };
}

export function createAuth() {
	const { baseUrl, secret } = getAuthConfig();
	return createNeonAuth({
		baseUrl,
		cookies: {
			secret,
		},
	});
}

let authInstance: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
	if (!authInstance) {
		authInstance = createAuth();
	}
	return authInstance;
}
