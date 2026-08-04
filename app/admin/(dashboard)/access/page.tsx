import { requireRole } from '@/lib/auth/session';
import { AccessManagementPanel } from '@/modules/admin/access/access-management-panel';

export const dynamic = 'force-dynamic';

export default async function AdminAccessPage() {
	await requireRole('super_admin');
	return <AccessManagementPanel />;
}
