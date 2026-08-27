import type { AccessRole } from '@/lib/auth/types';

export type AdminModule = {
	id: string;
	label: string;
	href: string;
	minRole: AccessRole;
	description: string;
};

const ROLE_PRIORITY: Record<AccessRole, number> = {
	super_admin: 3,
	ambassador: 2,
	guest: 1,
};

export const adminModules: AdminModule[] = [
	{
		id: 'caps',
		label: 'Gorras',
		href: '/admin/caps',
		minRole: 'ambassador',
		description: 'Fila y entrega de gorras del meetup.',
	},
	{
		id: 'access',
		label: 'Acceso',
		href: '/admin/access',
		minRole: 'super_admin',
		description: 'Administra quién puede entrar al panel.',
	},
];

export function getModulesForRole(role: AccessRole): AdminModule[] {
	return adminModules.filter((module) => ROLE_PRIORITY[role] >= ROLE_PRIORITY[module.minRole]);
}
