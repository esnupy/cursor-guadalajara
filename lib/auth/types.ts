import type { AccessRole } from '@/lib/db/schema';

export type { AccessRole };

export type AdminSession = {
	email: string;
	role: AccessRole;
	authSource: 'neon' | 'dev';
};
