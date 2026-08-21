import type { Metadata } from 'next';
import CharlasLanding from '@/components/CharlasLanding';
import JsonLd from '@/components/JsonLd';
import Navbar from '@/components/Navbar';
import { charlasCall, getCharlasEvent } from '@/content/charlas';
import { siteConfig } from '@/content/site.config';

const event = getCharlasEvent();
const pageDescription = `${charlasCall.title} en el ${siteConfig.communityName}. Postúlate desde Cursor.`;

export const metadata: Metadata = {
	title: `${charlasCall.title} | ${siteConfig.communityName}`,
	description: pageDescription,
	openGraph: {
		title: charlasCall.title,
		description: pageDescription,
		type: 'website',
	},
};

const buildCharlasJsonLd = () => ({
	'@context': 'https://schema.org',
	'@type': 'Event',
	name: event.title,
	description: pageDescription,
	startDate: event.date,
	location: {
		'@type': 'Place',
		name: event.location,
	},
	organizer: {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.siteUrl,
	},
	eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
	eventStatus: 'https://schema.org/EventScheduled',
	...(event.lumaUrl ? { url: event.lumaUrl } : {}),
});

/**
 * Speaker call landing at /charlas.
 */
export default function CharlasPage() {
	return (
		<main className="min-h-screen scroll-smooth bg-background text-foreground">
			<JsonLd data={buildCharlasJsonLd()} />
			<Navbar />
			<div className="mx-auto max-w-5xl">
				<CharlasLanding />
			</div>
		</main>
	);
}
