import { MetadataRoute } from 'next';
import { privacidad, terminos } from '@/content/legal';
import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { recapsBySlug } from '@/content/recaps';
import { cursorComoAgenteTalk } from '@/content/talks/cursor-como-agente';
import { grokBotTalk } from '@/content/talks/grok-bot';
import { howToBabysitAgentsTalk } from '@/content/talks/how-to-babysit-agents';
import { skillhellTalk } from '@/content/talks/skillhell';

import { siteConfig } from '@/content/site.config';

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: siteConfig.siteUrl);

const talkPaths = [skillhellTalk.path, cursorComoAgenteTalk.path, howToBabysitAgentsTalk.path, grokBotTalk.path];

export default function sitemap(): MetadataRoute.Sitemap {
	const recapEntries = Object.values(recapsBySlug).map((recap) => ({
		url: `${BASE_URL}/recaps/${recap.slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	const talkEntries = talkPaths.map((path) => ({
		url: `${BASE_URL}${path}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.6,
	}));

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${BASE_URL}${meetupPromo.path}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		...talkEntries,
		...recapEntries,
		{
			url: `${BASE_URL}${privacidad.path}`,
			lastModified: new Date(privacidad.updatedAt),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `${BASE_URL}${terminos.path}`,
			lastModified: new Date(terminos.updatedAt),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	];
}
