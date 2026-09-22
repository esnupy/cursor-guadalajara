import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { cafeCursorGuadalajaraCard } from '@/content/recaps/cafe-cursor-guadalajara';
import { cursorMeetupGuadalajaraCard, cursorMeetupGuadalajaraRecap } from '@/content/recaps/cursor-meetup-guadalajara';
import { isUpcomingEvent } from '@/lib/events';
import { CursorEvent } from '@/lib/types';

// REPLACE: Replace all sample events, locations, and Luma URLs with real community events.
export const events: CursorEvent[] = [
	{
		id: meetupPromo.id,
		title: meetupPromo.title,
		date: meetupPromo.date,
		displayDate: meetupPromo.displayDate,
		location: meetupPromo.location.name,
		lumaUrl: meetupPromo.lumaUrl,
		recapPath: `/recaps/${cursorMeetupGuadalajaraRecap.slug}`,
		thumbnail: cursorMeetupGuadalajaraCard.thumbnail,
		galleryImages: cursorMeetupGuadalajaraCard.galleryImages,
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
		thumbnail: cafeCursorGuadalajaraCard.thumbnail,
		galleryImages: cafeCursorGuadalajaraCard.galleryImages,
		host: {
			name: 'Ventura Café',
			logo: cafeCursorGuadalajaraCard.hostLogo,
			url: 'https://maps.google.com/?q=Ventura+Café+Guadalajara',
		},
	},
];

const byDateAsc = (a: CursorEvent, b: CursorEvent) => (a.date ?? '9999-12-31').localeCompare(b.date ?? '9999-12-31');

const byDateDesc = (a: CursorEvent, b: CursorEvent) => (b.date ?? '').localeCompare(a.date ?? '');

/** Events whose date is today or later in Guadalajara. Undated events stay here. */
export const getUpcomingEvents = (now = new Date()): CursorEvent[] =>
	events.filter((event) => isUpcomingEvent(event, now)).sort(byDateAsc);

/** Events whose date is before today in Guadalajara, most recent first. */
export const getPastEvents = (now = new Date()): CursorEvent[] =>
	events.filter((event) => !isUpcomingEvent(event, now)).sort(byDateDesc);
