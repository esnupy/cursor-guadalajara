'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroHeader from '@/components/HeroHeader';
import AmbassadorSection from '@/components/AmbassadorSection';
import FeaturedSection from '@/components/FeaturedSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import LumaCalendar from '@/components/LumaCalendar';

function buildHomeJsonLd() {
	const org = {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.cursorCommunityUrl,
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
			...(event.lumaUrl ? { url: event.lumaUrl } : {}),
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

		<div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
			<AmbassadorSection />
			<SectionDivider />
			<FeaturedSection />
			<SectionDivider />
			<UpcomingEvents />
			<LumaCalendar />
			<SectionDivider />
			<PastEvents />
			<SectionDivider />
			<GlobalEvents />
			<Footer />
		</div>
	</main>
);

export default Home;
