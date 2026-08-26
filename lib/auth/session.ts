import { redirect } from 'next/navigation';

import {
	clearDevSession,
	getAutoDevEmail,
	getDevSessionEmail,
	isDevBypassEnabled,
	setDevSession,
} from '@/lib/auth/dev-bypass';
import { collectCandidateEmails } from '@/lib/auth/github-emails';
import { resolveGrantByEmail, resolveGrantFromEmails } from '@/lib/auth/grants';
import { getAuth } from '@/lib/auth/server';
import { clearTempSession, getTempSessionEmail, setTempSession } from '@/lib/auth/temp-access';
import type { AccessRole, AdminSession } from '@/lib/auth/types';

export async function getAdminSession(): Promise<AdminSession | null> {
	if (isDevBypassEnabled()) {
		const autoEmail = getAutoDevEmail();
		const devEmail = (await getDevSessionEmail()) ?? autoEmail;
		if (devEmail) {
			const grant = await resolveGrantByEmail(devEmail);
			if (!grant) {
				return null;
			}
			return {
				email: grant.email,
				role: grant.role,
				authSource: 'dev',
			};
		}
		return null;
	}

	// TODO: Drop this temp-cookie branch when Neon GitHub OAuth is restored.
	const tempEmail = await getTempSessionEmail();
	if (tempEmail) {
		const grant = await resolveGrantByEmail(tempEmail);
		if (!grant) {
			return null;
		}
		return {
			email: grant.email,
			role: grant.role,
			authSource: 'temp',
		};
	}

	const auth = getAuth();
	const { data: session } = await auth.getSession();
	if (!session?.user) {
		return null;
	}

	const candidateEmails = await collectCandidateEmails(session.user);
	const grant = await resolveGrantFromEmails(candidateEmails);
	if (!grant) {
		return null;
	}

	return {
		email: grant.email,
		role: grant.role,
		authSource: 'neon',
	};
}

export async function requireAdminSession(): Promise<AdminSession> {
	const session = await getAdminSession();
	if (!session) {
		redirect('/admin/login');
	}
	return session;
}

export async function requireRole(requiredRole: AccessRole): Promise<AdminSession> {
	const session = await requireAdminSession();
	const rolePriority: Record<AccessRole, number> = {
		guest: 1,
		ambassador: 2,
		super_admin: 3,
	};

	if (rolePriority[session.role] < rolePriority[requiredRole]) {
		redirect('/admin');
	}

	return session;
}

export async function establishDevSessionFromEmail(email: string): Promise<AdminSession | null> {
	const grant = await resolveGrantByEmail(email);
	if (!grant) {
		return null;
	}

	await setDevSession(grant.email);
	return {
		email: grant.email,
		role: grant.role,
		authSource: 'dev',
	};
}

export async function establishTempSessionFromEmail(email: string): Promise<AdminSession | null> {
	const grant = await resolveGrantByEmail(email);
	if (!grant) {
		return null;
	}

	await setTempSession(grant.email);
	return {
		email: grant.email,
		role: grant.role,
		authSource: 'temp',
	};
}

export async function signOutAdmin(): Promise<void> {
	if (isDevBypassEnabled()) {
		await clearDevSession();
		return;
	}

	await clearTempSession();
	try {
		const auth = getAuth();
		await auth.signOut();
	} catch {
		// Neon Auth is currently pointed at the development branch.
	}
}
