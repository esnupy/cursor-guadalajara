import { redirect } from 'next/navigation';

import { collectCandidateEmails } from '@/lib/auth/github-emails';
import { resolveGrantFromEmails } from '@/lib/auth/grants';
import { getAuth } from '@/lib/auth/server';
import { isDevBypassEnabled } from '@/lib/auth/dev-bypass';

export const dynamic = 'force-dynamic';

export default async function AdminAuthCompletePage() {
	// TODO: GitHub OAuth completion path — unused until Neon Auth on main is restored.
	if (isDevBypassEnabled()) {
		redirect('/admin/login');
	}

	const auth = getAuth();
	const { data: session } = await auth.getSession();

	if (!session?.user) {
		redirect('/admin/login');
	}

	const candidateEmails = await collectCandidateEmails(session.user);
	const grant = await resolveGrantFromEmails(candidateEmails);

	if (!grant) {
		await auth.signOut();
		redirect('/admin/not-approved');
	}

	redirect('/admin');
}
