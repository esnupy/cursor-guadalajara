import { and, eq, inArray, ne, sql } from 'drizzle-orm';

import { getDb } from '@/lib/db';
import { accessGrants, type AccessGrant, type AccessRole } from '@/lib/db/schema';

const ROLE_PRIORITY: Record<AccessRole, number> = {
	super_admin: 3,
	ambassador: 2,
	guest: 1,
};

export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

export function pickHighestRoleGrant(grants: AccessGrant[]): AccessGrant | null {
	if (grants.length === 0) {
		return null;
	}

	return grants.reduce((best, current) => {
		if (ROLE_PRIORITY[current.role] > ROLE_PRIORITY[best.role]) {
			return current;
		}
		return best;
	});
}

export async function resolveGrantByEmail(email: string): Promise<AccessGrant | null> {
	const normalized = normalizeEmail(email);
	const [grant] = await getDb().select().from(accessGrants).where(eq(accessGrants.email, normalized)).limit(1);
	return grant ?? null;
}

export async function resolveGrantFromEmails(emails: string[]): Promise<AccessGrant | null> {
	const normalized = [...new Set(emails.map(normalizeEmail).filter(Boolean))];
	if (normalized.length === 0) {
		return null;
	}

	const grants = await getDb().select().from(accessGrants).where(inArray(accessGrants.email, normalized));
	return pickHighestRoleGrant(grants);
}

export function hasMinimumRole(userRole: AccessRole, requiredRole: AccessRole): boolean {
	return ROLE_PRIORITY[userRole] >= ROLE_PRIORITY[requiredRole];
}

export async function canRemoveOrDemoteSuperAdmin(grantId: string, nextRole?: AccessRole): Promise<boolean> {
	if (nextRole && nextRole !== 'super_admin') {
		const [{ count }] = await getDb()
			.select({ count: sql<number>`count(*)::int` })
			.from(accessGrants)
			.where(eq(accessGrants.role, 'super_admin'));

		if (count <= 1) {
			const [target] = await getDb().select().from(accessGrants).where(eq(accessGrants.id, grantId)).limit(1);
			if (target?.role === 'super_admin') {
				return false;
			}
		}
	}

	if (!nextRole) {
		const [{ count }] = await getDb()
			.select({ count: sql<number>`count(*)::int` })
			.from(accessGrants)
			.where(eq(accessGrants.role, 'super_admin'));

		if (count <= 1) {
			const [target] = await getDb().select().from(accessGrants).where(eq(accessGrants.id, grantId)).limit(1);
			if (target?.role === 'super_admin') {
				return false;
			}
		}
	}

	return true;
}

export async function countSuperAdminsExcluding(grantId: string): Promise<number> {
	const [{ count }] = await getDb()
		.select({ count: sql<number>`count(*)::int` })
		.from(accessGrants)
		.where(and(eq(accessGrants.role, 'super_admin'), ne(accessGrants.id, grantId)));

	return count;
}
