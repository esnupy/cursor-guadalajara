import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SkillhellDeck from '@/components/talks/skillhell/SkillhellDeck';
import { skillhellTalk } from '@/content/talks/skillhell';
import { siteConfig } from '@/content/site.config';

const talkTitle = skillhellTalk.title.join(' ');

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
	},
};

export default function SkillhellTalkPage() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<Navbar />
			<div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center px-[clamp(1.25rem,4vw,4rem)] py-8">
				<SkillhellDeck />
			</div>
		</main>
	);
}
