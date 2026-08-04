import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getModulesForRole } from '@/lib/admin/modules';
import { requireAdminSession } from '@/lib/auth/session';

export default async function AdminHomePage() {
	const session = await requireAdminSession();
	const modules = getModulesForRole(session.role);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-medium">Panel de administración</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Bienvenido, {session.email}. Selecciona un módulo para comenzar.
				</p>
			</div>

			{modules.length === 0 ? (
				<div className="rounded-lg border border-dashed p-8 text-center">
					<p className="text-sm text-muted-foreground">Aún no tienes módulos disponibles para tu rol.</p>
				</div>
			) : (
				<div className="grid gap-4 md:grid-cols-2">
					{modules.map((module) => (
						<div key={module.id} className="rounded-lg border p-5">
							<h2 className="text-lg font-medium">{module.label}</h2>
							<p className="mt-2 text-sm text-muted-foreground">{module.description}</p>
							<Button asChild className="mt-4">
								<Link href={module.href}>Abrir módulo</Link>
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
