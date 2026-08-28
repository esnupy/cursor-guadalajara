import type { Metadata } from 'next';
import SkillhellDeck from '@/components/talks/skillhell/SkillhellDeck';
import { skillhellTalk } from '@/content/talks/skillhell';
import { siteConfig } from '@/content/site.config';

const talkTitle = skillhellTalk.title.join(' ');

const ogImage = {
	url: skillhellTalk.ogImage.src,
	width: skillhellTalk.ogImage.width,
	height: skillhellTalk.ogImage.height,
	alt: skillhellTalk.ogImage.alt,
};

export const metadata: Metadata = {
	title: `${talkTitle} | ${siteConfig.communityName}`,
	description:
		'Cómo una skill impone el mismo proceso con un árbol de decisión. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
	openGraph: {
		title: talkTitle,
		description:
			'Cómo una skill impone el mismo proceso con un árbol de decisión. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
		locale: 'es_MX',
		type: 'website',
		url: skillhellTalk.path,
		images: [ogImage],
	},
	twitter: {
		card: 'summary_large_image',
		title: talkTitle,
		description:
			'Cómo una skill impone el mismo proceso con un árbol de decisión. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
		images: [ogImage],
	},
};

export default function SkillhellTalkPage() {
	return <SkillhellDeck />;
}
