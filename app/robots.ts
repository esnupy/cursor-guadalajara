import { MetadataRoute } from 'next';

import { capGiveaway } from '@/content/caps';
import { siteConfig } from '@/content/site.config';

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: siteConfig.siteUrl);

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/charlas', capGiveaway.boardPath],
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
