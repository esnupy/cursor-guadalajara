import type { Metadata } from 'next';
import AssetDeck from '@/components/talks/AssetDeck';
import { cursorComoAgenteSlides, cursorComoAgenteTalk } from '@/content/talks/cursor-como-agente';
import { siteConfig } from '@/content/site.config';

const ogImage = {
	url: cursorComoAgenteTalk.ogImage.src,
	width: cursorComoAgenteTalk.ogImage.width,
	height: cursorComoAgenteTalk.ogImage.height,
	alt: cursorComoAgenteTalk.ogImage.alt,
};

export const metadata: Metadata = {
	title: `${cursorComoAgenteTalk.title} | ${siteConfig.communityName}`,
	description: cursorComoAgenteTalk.description,
	openGraph: {
		title: cursorComoAgenteTalk.title,
		description: cursorComoAgenteTalk.description,
		locale: 'es_MX',
		type: 'website',
		url: cursorComoAgenteTalk.path,
		images: [ogImage],
	},
	twitter: {
		card: 'summary_large_image',
		title: cursorComoAgenteTalk.title,
		description: cursorComoAgenteTalk.description,
		images: [ogImage],
	},
};

export default function CursorComoAgenteTalkPage() {
	return <AssetDeck label={`Presentación ${cursorComoAgenteTalk.title}`} slides={cursorComoAgenteSlides} />;
}
