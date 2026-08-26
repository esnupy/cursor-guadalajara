import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SkillhellDeck from '@/components/talks/skillhell/SkillhellDeck';
import { skillhellTalk } from '@/content/talks/skillhell';
import { siteConfig } from '@/content/site.config';

export const metadata: Metadata = {
	title: `${skillhellTalk.title} | ${siteConfig.communityName}`,
	description:
		'Cómo una skill impone el mismo proceso con un árbol de decisión. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
	openGraph: {
		title: skillhellTalk.title,
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
			<div className="mx-auto max-w-6xl px-[clamp(1.25rem,4vw,4rem)] py-12">
				<SkillhellDeck />
			</div>
		</main>
	);
}
