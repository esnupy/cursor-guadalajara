import type { Metadata } from 'next';

import { CapQueueBoard } from '@/components/CapQueueBoard';
import Navbar from '@/components/Navbar';
import { capGiveaway } from '@/content/caps';
import { siteConfig } from '@/content/site.config';
import { listCapBoard } from '@/lib/caps/persist';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: `${capGiveaway.title} | ${siteConfig.communityName}`,
	robots: { index: false, follow: false },
};

export default async function CapBoardPage() {
	const initialData = await listCapBoard();

	return (
		<main className="min-h-screen bg-background text-foreground">
			<Navbar sticky={false} />
			<CapQueueBoard initialData={initialData} />
		</main>
	);
}
