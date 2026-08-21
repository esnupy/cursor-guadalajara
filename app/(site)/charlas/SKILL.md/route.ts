import { getCharlasSkillMarkdown } from '@/content/charlas';
import { getSiteOrigin } from '@/lib/charlas/origin';

/**
 * Serves the optional Cursor skill at /charlas/SKILL.md.
 */
export const GET = () =>
	new Response(getCharlasSkillMarkdown(getSiteOrigin()), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'no-store',
			'Content-Disposition': 'inline; filename="SKILL.md"',
		},
	});
