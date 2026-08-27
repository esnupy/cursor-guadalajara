const HANDLE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MIN_HANDLE_LENGTH = 3;
const MAX_HANDLE_LENGTH = 39;

/**
 * Accepts a raw handle, @handle, or a cursor.com/@handle URL.
 */
export function normalizeHandle(value: string): string {
	let handle = value.trim().toLowerCase();
	handle = handle.replace(/^https?:\/\//, '');
	handle = handle.replace(/^(www\.)?cursor\.com\/@/, '');
	handle = handle.replace(/^@/, '');
	handle = handle.replace(/\/.*$/, '');
	return handle;
}

export function isValidHandle(handle: string): boolean {
	return handle.length >= MIN_HANDLE_LENGTH && handle.length <= MAX_HANDLE_LENGTH && HANDLE_PATTERN.test(handle);
}
