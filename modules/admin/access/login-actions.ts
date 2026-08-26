'use server';

import { redirect } from 'next/navigation';

import { isDevBypassEnabled } from '@/lib/auth/dev-bypass';
import { establishDevSessionFromEmail, establishTempSessionFromEmail } from '@/lib/auth/session';
import { verifyTempAccessCode } from '@/lib/auth/temp-access';

export async function devLoginAction(email: string) {
	if (!isDevBypassEnabled()) {
		return { error: 'El acceso de desarrollo no está habilitado' };
	}

	const session = await establishDevSessionFromEmail(email);
	if (!session) {
		return { error: 'Tu correo no está autorizado para acceder al panel' };
	}

	redirect('/admin');
}

export async function tempLoginAction(email: string, accessCode: string) {
	// TODO: Replace with GitHub OAuth (Neon Auth on main) and delete this action.
	// When restoring, also move Vercel DATABASE_URL off the development branch.
	if (isDevBypassEnabled()) {
		return { error: 'Usa el acceso de desarrollo en local' };
	}

	if (!verifyTempAccessCode(accessCode)) {
		return { error: 'El código de acceso no es válido' };
	}

	const session = await establishTempSessionFromEmail(email);
	if (!session) {
		return { error: 'Tu correo no está autorizado para acceder al panel' };
	}

	redirect('/admin');
}
