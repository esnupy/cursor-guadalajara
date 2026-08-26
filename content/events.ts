import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { CursorEvent } from '@/lib/types';

// REPLACE: Replace all sample events, locations, and Luma URLs with real community events.
export const events: CursorEvent[] = [
	{
		id: meetupPromo.id,
		title: meetupPromo.title,
		date: meetupPromo.date,
		displayDate: meetupPromo.displayDate,
		location: meetupPromo.location.name,
		status: 'upcoming',
		lumaUrl: meetupPromo.lumaUrl,
		promoPath: meetupPromo.path,
		soldOut: meetupPromo.soldOut,
	},
	{
		id: 'cafe-cursor-guadalajara-2026-04',
		title: 'Cafe Cursor Guadalajara',
		date: '2026-04-25',
		displayDate: '25 de abril de 2026',
		attendees: 55,
		location: 'Ventura Café, Guadalajara, Jalisco',
		recapPath: '/recaps/cafe-cursor-guadalajara',
		thumbnail: '/images/events/dsc04963.jpg',
		galleryImages: [
			'/images/events/dsc04975.jpg',
			'/images/events/dsc05058.jpg',
			'/images/events/dsc05026.jpg',
			'/images/events/dsc05021.jpg',
		],
		status: 'past',
		host: {
			name: 'Ventura Café',
			logo: '/images/events/dsc04979.jpg',
			url: 'https://maps.google.com/?q=Ventura+Café+Guadalajara',
		},
	},
];

export const upcomingEvents = events.filter((event) => event.status === 'upcoming');
export const pastEvents = events.filter((event) => event.status === 'past');
