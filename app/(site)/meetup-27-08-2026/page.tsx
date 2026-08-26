import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import MeetupPromo from '@/components/MeetupPromo';
import Navbar from '@/components/Navbar';
import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { siteConfig } from '@/content/site.config';

const pageDescription =
	'Primer meetup técnico de Cursor en Guadalajara. Cuatro charlas relámpago el 27 de agosto de 2026 en AstraZeneca GITC. El cupo está lleno.';

export const metadata: Metadata = {
	title: `${meetupPromo.title} | ${siteConfig.communityName}`,
	description: pageDescription,
	openGraph: {
		title: meetupPromo.title,
		description: pageDescription,
		locale: 'es_MX',
		type: 'website',
		url: meetupPromo.path,
	},
};

function buildMeetupJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: meetupPromo.title,
		description: pageDescription,
		startDate: meetupPromo.startDateTime,
		endDate: meetupPromo.endDateTime,
		url: `${siteConfig.siteUrl}${meetupPromo.path}`,
		image: meetupPromo.speakers.map((speaker) => `${siteConfig.siteUrl}${speaker.photo}`),
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
		location: {
			'@type': 'Place',
			name: meetupPromo.location.name,
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'Blvd. Puerta de Hierro 4965',
				addressLocality: 'Zapopan',
				addressRegion: 'Jalisco',
				postalCode: '45116',
				addressCountry: 'MX',
			},
		},
		organizer: {
			'@type': 'Organization',
			name: siteConfig.communityName,
			url: siteConfig.siteUrl,
		},
		performer: meetupPromo.speakers.map((speaker) => ({
			'@type': 'Person',
			name: speaker.name,
			...('url' in speaker && speaker.url ? { sameAs: speaker.url } : {}),
		})),
		offers: {
			'@type': 'Offer',
			url: meetupPromo.lumaUrl,
			availability: 'https://schema.org/SoldOut',
			price: 0,
			priceCurrency: 'MXN',
		},
	};
}

export default function MeetupPromoPage() {
	return (
		<main className="min-h-screen scroll-smooth bg-background text-foreground">
			<JsonLd data={buildMeetupJsonLd()} />
			<Navbar />
			<div className="mx-auto max-w-5xl px-[clamp(1.25rem,4vw,4rem)] py-12">
				<MeetupPromo />
			</div>
		</main>
	);
}
