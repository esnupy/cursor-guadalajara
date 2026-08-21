import { MetadataRoute } from 'next';
import { recapsBySlug } from '@/content/recaps';

import { siteConfig } from '@/content/site.config';

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: siteConfig.siteUrl);

export default function sitemap(): MetadataRoute.Sitemap {
	const recapEntries = Object.values(recapsBySlug).map((recap) => ({
		url: `${BASE_URL}/recaps/${recap.slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${BASE_URL}/charlas`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		...recapEntries,
	];
}
