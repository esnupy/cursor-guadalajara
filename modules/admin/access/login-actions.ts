'use server';

import { redirect } from 'next/navigation';

import { isDevBypassEnabled } from '@/lib/auth/dev-bypass';
import { establishDevSessionFromEmail } from '@/lib/auth/session';

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
