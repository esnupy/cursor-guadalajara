import type { Metadata } from 'next';
import AssetDeck from '@/components/talks/AssetDeck';
import { grokBotSlides, grokBotTalk } from '@/content/talks/grok-bot';
import { siteConfig } from '@/content/site.config';

const ogImage = {
	url: grokBotTalk.ogImage.src,
	width: grokBotTalk.ogImage.width,
	height: grokBotTalk.ogImage.height,
	alt: grokBotTalk.ogImage.alt,
};

export const metadata: Metadata = {
	title: `${grokBotTalk.title} | ${siteConfig.communityName}`,
	description: grokBotTalk.description,
	openGraph: {
		title: grokBotTalk.title,
		description: grokBotTalk.description,
		locale: 'es_MX',
		type: 'website',
		url: grokBotTalk.path,
		images: [ogImage],
	},
	twitter: {
		card: 'summary_large_image',
		title: grokBotTalk.title,
		description: grokBotTalk.description,
		images: [ogImage],
	},
};

export default function GrokBotTalkPage() {
	return <AssetDeck label={`Presentación ${grokBotTalk.title}`} slides={grokBotSlides} />;
}
