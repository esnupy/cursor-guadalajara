'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/client';
import { devLoginAction } from '@/modules/admin/access/login-actions';

export function AdminLoginForm({ devBypass }: { devBypass: boolean }) {
	const [email, setEmail] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	async function handleGitHubSignIn() {
		setIsPending(true);
		setError(null);
		const { error: signInError } = await authClient.signIn.social({
			provider: 'github',
			callbackURL: '/admin/auth/complete',
		});
		if (signInError) {
			setError(signInError.message ?? 'No se pudo iniciar sesión con GitHub');
			setIsPending(false);
		}
	}

	async function handleDevLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsPending(true);
		setError(null);

		const result = await devLoginAction(email);
		if (result?.error) {
			setError(result.error);
			setIsPending(false);
		}
	}

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
			<div className="space-y-2 text-center">
				<h1 className="text-2xl font-medium">Acceso al panel</h1>
				<p className="text-sm text-muted-foreground">Inicia sesión para administrar Cursor Guadalajara.</p>
			</div>

			<div className="mt-8 space-y-4 rounded-lg border p-6">
				{devBypass ? (
					<form className="space-y-4" onSubmit={handleDevLogin}>
						<div className="space-y-2">
							<Label htmlFor="email">Correo autorizado</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="tu@correo.com"
								required
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isPending}>
							Entrar en desarrollo
						</Button>
					</form>
				) : (
					<Button type="button" className="w-full" onClick={handleGitHubSignIn} disabled={isPending}>
						Continuar con GitHub
					</Button>
				)}

				{error ? <p className="text-sm text-destructive">{error}</p> : null}
			</div>
		</div>
	);
}
