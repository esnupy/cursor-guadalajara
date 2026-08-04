import { headers } from 'next/headers';

import { normalizeEmail } from '@/lib/auth/grants';
import { getAuth } from '@/lib/auth/server';

type SessionUser = {
	email?: string | null;
};

export async function collectCandidateEmails(user: SessionUser): Promise<string[]> {
	const emails = new Set<string>();

	if (user.email) {
		emails.add(normalizeEmail(user.email));
	}

	const githubEmails = await fetchVerifiedGitHubEmails();
	for (const email of githubEmails) {
		emails.add(email);
	}

	return [...emails];
}

async function fetchVerifiedGitHubEmails(): Promise<string[]> {
	const baseUrl = process.env.NEON_AUTH_BASE_URL;
	if (!baseUrl) {
		return [];
	}

	try {
		const requestHeaders = await headers();
		const cookie = requestHeaders.get('cookie');
		if (!cookie) {
			return [];
		}

		const tokenResponse = await fetch(`${baseUrl}/account/github/access-token`, {
			headers: { cookie },
			cache: 'no-store',
		});

		if (!tokenResponse.ok) {
			return [];
		}

		const tokenPayload = (await tokenResponse.json()) as { accessToken?: string };
		if (!tokenPayload.accessToken) {
			return [];
		}

		const emailsResponse = await fetch('https://api.github.com/user/emails', {
			headers: {
				Authorization: `Bearer ${tokenPayload.accessToken}`,
				Accept: 'application/vnd.github+json',
				'User-Agent': 'cursor-guadalajara-admin',
			},
			cache: 'no-store',
		});

		if (!emailsResponse.ok) {
			return [];
		}

		const emails = (await emailsResponse.json()) as Array<{ email: string; verified: boolean }>;
		return emails.filter((entry) => entry.verified).map((entry) => normalizeEmail(entry.email));
	} catch {
		return [];
	}
}

export async function getNeonAuthUserEmail(): Promise<string | null> {
	const auth = getAuth();
	const { data: session } = await auth.getSession();
	return session?.user?.email ? normalizeEmail(session.user.email) : null;
}
