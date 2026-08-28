import type { Metadata } from 'next';
import AssetDeck from '@/components/talks/AssetDeck';
import { howToBabysitAgentsSlides, howToBabysitAgentsTalk } from '@/content/talks/how-to-babysit-agents';
import { siteConfig } from '@/content/site.config';

const ogImage = {
	url: howToBabysitAgentsTalk.ogImage.src,
	width: howToBabysitAgentsTalk.ogImage.width,
	height: howToBabysitAgentsTalk.ogImage.height,
	alt: howToBabysitAgentsTalk.ogImage.alt,
};

export const metadata: Metadata = {
	title: `${howToBabysitAgentsTalk.title} | ${siteConfig.communityName}`,
	description: howToBabysitAgentsTalk.description,
	openGraph: {
		title: howToBabysitAgentsTalk.title,
		description: howToBabysitAgentsTalk.description,
		locale: 'es_MX',
		type: 'website',
		url: howToBabysitAgentsTalk.path,
		images: [ogImage],
	},
	twitter: {
		card: 'summary_large_image',
		title: howToBabysitAgentsTalk.title,
		description: howToBabysitAgentsTalk.description,
		images: [ogImage],
	},
};

export default function HowToBabysitAgentsTalkPage() {
	return <AssetDeck label={`Presentación ${howToBabysitAgentsTalk.title}`} slides={howToBabysitAgentsSlides} />;
}
