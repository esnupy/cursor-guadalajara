'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroHeader from '@/components/HeroHeader';
import AmbassadorSection from '@/components/AmbassadorSection';
import FeaturedSection from '@/components/FeaturedSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';

function buildHomeJsonLd() {
	const org = {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.siteUrl,
	};

	const eventItems = upcomingEvents
		.filter((event) => Boolean(event.date))
		.map((event) => ({
			'@type': 'Event',
			name: event.title,
			startDate: event.date,
			location: {
				'@type': 'Place',
				name: event.location,
			},
			organizer: org,
			...(event.promoPath
				? { url: `${siteConfig.siteUrl}${event.promoPath}` }
				: event.lumaUrl
					? { url: event.lumaUrl }
					: {}),
			eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
			eventStatus: 'https://schema.org/EventScheduled',
		}));

	return {
		'@context': 'https://schema.org',
		'@graph': [org, ...eventItems],
	};
}

const Home: React.FC = () => (
	<main className="min-h-screen scroll-smooth bg-background text-foreground">
		<JsonLd data={buildHomeJsonLd()} />
		<Navbar />
		<HeroHeader />

		<div className="mx-auto max-w-5xl">
			<AmbassadorSection />
			<FeaturedSection />
			<UpcomingEvents />
			<PastEvents />
			<GlobalEvents />
		</div>
	</main>
);

export default Home;
