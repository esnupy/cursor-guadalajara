import { AZ_EMAIL_DOMAIN } from '@/lib/caps/constants';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeCapEmail(email: string): string {
	return email.trim().toLowerCase();
}

export function isValidCapEmail(email: string): boolean {
	return EMAIL_PATTERN.test(email);
}

export function isAstrazenecaEmail(email: string): boolean {
	const at = email.lastIndexOf('@');
	if (at === -1) {
		return false;
	}
	return email.slice(at + 1) === AZ_EMAIL_DOMAIN;
}
