import { AdminShell } from '@/components/admin/admin-shell';
import { requireAdminSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await requireAdminSession();

	return <AdminShell session={session}>{children}</AdminShell>;
}
