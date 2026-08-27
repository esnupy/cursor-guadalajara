import { CURSOR_PROFILE_URL_PREFIX } from '@/lib/caps/constants';

export function cursorProfileUrl(handle: string): string {
	return `${CURSOR_PROFILE_URL_PREFIX}${handle}`;
}
