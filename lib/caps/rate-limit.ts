/** In-memory stub. Not wired into POST /api/caps; keep for a future public form. */
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;

const attemptsByKey = new Map<string, number[]>();

/**
 * Returns true when the caller still has budget inside the one-minute window.
 */
export const consumeCapsRateLimit = (key: string, now = Date.now()): boolean => {
	const recent = (attemptsByKey.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

	if (recent.length >= MAX_ATTEMPTS) {
		attemptsByKey.set(key, recent);
		return false;
	}

	recent.push(now);
	attemptsByKey.set(key, recent);
	return true;
};
