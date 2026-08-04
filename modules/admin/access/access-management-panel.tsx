'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { AccessRole } from '@/lib/db/schema';
import {
	createGrant,
	deleteGrant,
	listGrants,
	updateGrantRole,
	type AccessGrantRow,
} from '@/modules/admin/access/grant-actions';

export function AccessManagementPanel() {
	const queryClient = useQueryClient();
	const [error, setError] = useState<string | null>(null);
	const [newEmail, setNewEmail] = useState('');
	const [newRole, setNewRole] = useState<AccessRole>('ambassador');
	const [open, setOpen] = useState(false);

	const grantsQuery = useQuery({
		queryKey: ['access-grants'],
		queryFn: listGrants,
	});

	const invalidate = () => queryClient.invalidateQueries({ queryKey: ['access-grants'] });

	const createMutation = useMutation({
		mutationFn: createGrant,
		onSuccess: async () => {
			setError(null);
			setNewEmail('');
			setOpen(false);
			await invalidate();
		},
		onError: (mutationError) => {
			setError(mutationError instanceof Error ? mutationError.message : 'No se pudo crear el acceso');
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateGrantRole,
		onSuccess: async () => {
			setError(null);
			await invalidate();
		},
		onError: (mutationError) => {
			setError(mutationError instanceof Error ? mutationError.message : 'No se pudo actualizar el rol');
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteGrant,
		onSuccess: async () => {
			setError(null);
			await invalidate();
		},
		onError: (mutationError) => {
			setError(mutationError instanceof Error ? mutationError.message : 'No se pudo eliminar el acceso');
		},
	});

	const grants = grantsQuery.data ?? [];

	return (
		<div className="space-y-6">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-medium">Gestión de acceso</h1>
					<p className="mt-1 text-sm text-muted-foreground">Administra los correos autorizados para entrar al panel.</p>
				</div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>Agregar acceso</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Nuevo acceso</DialogTitle>
						</DialogHeader>
						<form
							className="space-y-4"
							onSubmit={(event) => {
								event.preventDefault();
								createMutation.mutate({ email: newEmail, role: newRole });
							}}
						>
							<div className="space-y-2">
								<Label htmlFor="email">Correo</Label>
								<Input
									id="email"
									type="email"
									value={newEmail}
									onChange={(event) => setNewEmail(event.target.value)}
									placeholder="persona@ejemplo.com"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="role">Rol</Label>
								<Select value={newRole} onValueChange={(value) => setNewRole(value as AccessRole)}>
									<SelectTrigger id="role">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="super_admin">Super admin</SelectItem>
										<SelectItem value="ambassador">Embajador</SelectItem>
										<SelectItem value="guest">Invitado</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<DialogFooter>
								<Button type="submit" disabled={createMutation.isPending}>
									Guardar
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{error ? <p className="text-sm text-destructive">{error}</p> : null}

			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Correo</TableHead>
							<TableHead>Rol</TableHead>
							<TableHead>Creado</TableHead>
							<TableHead>Por</TableHead>
							<TableHead className="text-right">Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{grantsQuery.isLoading ? (
							<TableRow>
								<TableCell colSpan={5} className="text-muted-foreground">
									Cargando accesos...
								</TableCell>
							</TableRow>
						) : grants.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} className="text-muted-foreground">
									No hay accesos registrados.
								</TableCell>
							</TableRow>
						) : (
							grants.map((grant) => (
								<GrantRow
									key={grant.id}
									grant={grant}
									onUpdate={(role) => updateMutation.mutate({ id: grant.id, role })}
									onDelete={() => deleteMutation.mutate({ id: grant.id })}
									isUpdating={updateMutation.isPending}
									isDeleting={deleteMutation.isPending}
								/>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

function GrantRow({
	grant,
	onUpdate,
	onDelete,
	isUpdating,
	isDeleting,
}: {
	grant: AccessGrantRow;
	onUpdate: (role: AccessRole) => void;
	onDelete: () => void;
	isUpdating: boolean;
	isDeleting: boolean;
}) {
	const [role, setRole] = useState<AccessRole>(grant.role);

	return (
		<TableRow>
			<TableCell>{grant.email}</TableCell>
			<TableCell>
				<Select
					value={role}
					onValueChange={(value) => {
						const nextRole = value as AccessRole;
						setRole(nextRole);
						onUpdate(nextRole);
					}}
					disabled={isUpdating}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="super_admin">Super admin</SelectItem>
						<SelectItem value="ambassador">Embajador</SelectItem>
						<SelectItem value="guest">Invitado</SelectItem>
					</SelectContent>
				</Select>
			</TableCell>
			<TableCell>{new Date(grant.createdAt).toLocaleDateString('es-MX')}</TableCell>
			<TableCell>{grant.createdByEmail ?? '—'}</TableCell>
			<TableCell className="text-right">
				<Button variant="outline" size="sm" onClick={onDelete} disabled={isDeleting}>
					Eliminar
				</Button>
			</TableCell>
		</TableRow>
	);
}
