import { WorldEventPhoto } from '@/lib/types';

export const globalEventsSection = {
	title: 'Café Cursor alrededor del mundo',
	description:
		'Usuarios de Cursor construyen juntos en todo el mundo. Aunque vivimos en distintas zonas horarias, somos una sola comunidad.',
} as const;

export const worldEventPhotos: WorldEventPhoto[] = [
	{
		src: '/images/events/cursor-event-02.jpg',
		location: 'Seoul',
		date: 'enero de 2026',
		alt: 'Meetup de Cursor en Seúl',
	},
	{
		src: '/images/events/cursor-event-04.jpg',
		location: 'Berlin',
		date: 'diciembre de 2025',
		alt: 'Meetup de Cursor en Berlín',
	},
	{
		src: '/images/events/cursor-event-05.jpg',
		location: 'San Francisco',
		date: 'noviembre de 2025',
		alt: 'Meetup de Cursor en San Francisco',
	},
];
