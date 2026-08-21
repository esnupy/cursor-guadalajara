import { siteConfig } from '@/content/site.config';

/**
 * Canonical public origin for agent docs and JSON-LD.
 */
export const getSiteOrigin = (): string => {
	if (process.env.NEXT_PUBLIC_SITE_URL) {
		return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
	}

	if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}

	return siteConfig.siteUrl;
};
