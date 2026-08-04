import { createNeonAuth } from '@neondatabase/auth/next/server';

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
