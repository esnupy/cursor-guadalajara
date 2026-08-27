import { requireRole } from '@/lib/auth/session';
import { CapsQueuePanel } from '@/modules/admin/caps/caps-queue-panel';

export const dynamic = 'force-dynamic';

export default async function AdminCapsPage() {
	await requireRole('ambassador');
	return <CapsQueuePanel />;
}
