import { RecapData } from '@/lib/types';

export const cafeCursorGuadalajaraRecap: RecapData = {
	slug: 'cafe-cursor-guadalajara',
	title: 'Cafe Cursor Guadalajara — Recap',
	date: 'April 25, 2026 · 10:00–16:00',
	attendees: 55,
	summary: [
		"Guadalajara, Cafe Cursor is back! We met at Ventura Café for a Cafe Takeover: bring your laptop, grab a coffee, and spend a few hours shipping projects with Cursor — or just stop by to meet the community.",
		"It wasn't a conference or a formal workshop. Developers, designers, students, and anyone curious about AI shared workflows, sat at community-facilitated tables, and saw how Cursor fits into day-to-day work.",
		'Cursor credits and coffee were available. Access was organized in blocks: Morning (10am–1pm), Afternoon (1pm–4pm), and Drop-By / General for anyone who just wanted to say hi.',
	],
	host: {
		name: 'Ventura Café',
		logo: '/images/events/dsc04979.jpg',
		url: 'https://maps.google.com/?q=Ventura+Café+Guadalajara',
	},
	highlights: [
		{
			quote:
				"I showed up without a clear plan and left with a feature almost done. Best part was asking the people at the next table how they structure their prompts.",
			author: 'Morning Block attendee',
		},
		{
			quote:
				"It's not a typical slides meetup. It's coffee, laptops, and people who are actually building. Guadalajara feels very alive.",
			author: 'Afternoon Block participant',
		},
		{
			quote:
				'I only dropped by for a bit and ended up talking for half an hour about agents and code reviews. Signed up for the next one without thinking twice.',
			author: 'Drop-By visitor',
		},
		{
			quote:
				'Cursor credits plus a complimentary coffee remove the friction. You sit down, open the editor, and you are in build mode right away.',
			author: 'Community member',
		},
	],
	resources: [
		{ label: 'Cursor Guadalajara Community', url: 'https://luma.com/cursor-guadalajara-mexico' },
		{ label: 'Cursor Community', url: 'https://cursor.com/community' },
	],
	photoCredits: [{ name: 'Cursor Guadalajara Community' }],
	photos: [
		{
			src: '/images/events/dsc04984.jpg',
			alt: 'Cursor Guadalajara community collaborating around a table',
		},
		{
			src: '/images/events/dsc04979.jpg',
			alt: 'Cafe Cursor cups with the event logo',
		},
		{
			src: '/images/events/dsc05031.jpg',
			alt: 'Attendees chatting at Ventura Café',
		},
		{
			src: '/images/events/dsc04994.jpg',
			alt: 'Cursor stickers on the event table',
		},
		{
			src: '/images/events/dsc04988.jpg',
			alt: 'Participants working together on laptops',
		},
		{
			src: '/images/events/dsc05026.jpg',
			alt: 'Overview of Cafe Cursor in Guadalajara',
		},
		{
			src: '/images/events/dsc05021.jpg',
			alt: 'Builders coding at a long table during the event',
		},
		{
			src: '/images/events/dsc04963.jpg',
			alt: 'A moment from Cafe Cursor Guadalajara',
		},
		{
			src: '/images/events/dsc04975.jpg',
			alt: 'Coworking vibe at Ventura Café',
		},
		{
			src: '/images/events/dsc05058.jpg',
			alt: 'Community during the Cafe Takeover',
		},
	],
};
