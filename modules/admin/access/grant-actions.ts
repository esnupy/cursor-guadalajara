'use server';

import { asc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { canRemoveOrDemoteSuperAdmin, normalizeEmail } from '@/lib/auth/grants';
import { requireRole } from '@/lib/auth/session';
import { getDb } from '@/lib/db';
import { accessGrants, type AccessRole } from '@/lib/db/schema';

export type AccessGrantRow = {
	id: string;
	email: string;
	role: AccessRole;
	createdAt: string;
	updatedAt: string;
	createdByEmail: string | null;
};

export async function listGrants(): Promise<AccessGrantRow[]> {
	await requireRole('super_admin');
	const grants = await getDb().select().from(accessGrants).orderBy(asc(accessGrants.createdAt));

	return grants.map((grant) => ({
		id: grant.id,
		email: grant.email,
		role: grant.role,
		createdAt: grant.createdAt.toISOString(),
		updatedAt: grant.updatedAt.toISOString(),
		createdByEmail: grant.createdByEmail,
	}));
}

export async function createGrant(input: { email: string; role: AccessRole }) {
	const session = await requireRole('super_admin');
	const email = normalizeEmail(input.email);

	if (!email.includes('@')) {
		throw new Error('Correo inválido');
	}

	try {
		await getDb().insert(accessGrants).values({
			email,
			role: input.role,
			createdByEmail: session.email,
		});
	} catch {
		throw new Error('Ese correo ya está registrado');
	}

	revalidatePath('/admin/access');
}

export async function updateGrantRole(input: { id: string; role: AccessRole }) {
	await requireRole('super_admin');
	const allowed = await canRemoveOrDemoteSuperAdmin(input.id, input.role);
	if (!allowed) {
		throw new Error('No puedes quitar el último super administrador');
	}

	await getDb()
		.update(accessGrants)
		.set({
			role: input.role,
			updatedAt: new Date(),
		})
		.where(eq(accessGrants.id, input.id));

	revalidatePath('/admin/access');
}

export async function deleteGrant(input: { id: string }) {
	await requireRole('super_admin');
	const allowed = await canRemoveOrDemoteSuperAdmin(input.id);
	if (!allowed) {
		throw new Error('No puedes eliminar el último super administrador');
	}

	await getDb().delete(accessGrants).where(eq(accessGrants.id, input.id));
	revalidatePath('/admin/access');
}
