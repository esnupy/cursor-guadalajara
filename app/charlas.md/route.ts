import { getCharlasMarkdown } from '@/content/charlas';
import { getSiteOrigin } from '@/lib/charlas/origin';

/**
 * Serves the agent protocol at /charlas.md.
 */
export const GET = () =>
	new Response(getCharlasMarkdown(getSiteOrigin()), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'no-store',
			'Content-Disposition': 'inline; filename="charlas.md"',
		},
	});
