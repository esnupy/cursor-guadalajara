import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function AdminNotApprovedPage() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 text-center">
			<h1 className="text-2xl font-medium">Acceso no autorizado</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				Tu cuenta no está en la lista de accesos aprobados. Contacta a un super administrador si necesitas entrar.
			</p>
			<Button asChild className="mt-6">
				<Link href="/admin/login">Volver al inicio de sesión</Link>
			</Button>
		</div>
	);
}
