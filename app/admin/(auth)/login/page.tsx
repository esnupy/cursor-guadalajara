import { redirect } from 'next/navigation';

import { isDevBypassEnabled } from '@/lib/auth/dev-bypass';
import { getAdminSession } from '@/lib/auth/session';
import { AdminLoginForm } from '@/modules/admin/access/admin-login-form';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
	const session = await getAdminSession();
	if (session) {
		redirect('/admin');
	}

	return <AdminLoginForm devBypass={isDevBypassEnabled()} />;
}
