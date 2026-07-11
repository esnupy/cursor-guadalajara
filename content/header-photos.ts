import { HeaderPhoto } from '@/lib/types';

// Guadalajara community event photos for the hero bento grid.
// Desktop grid: 4 columns x 4 rows (16 cells).
export const headerPhotos: HeaderPhoto[] = [
	{
		src: '/images/events/dsc04984.jpg',
		alt: 'Cursor Guadalajara community collaborating around a table',
		row: 1,
		col: 1,
		rowSpan: 2,
		colSpan: 2,
		mobile: { row: 1, col: 1, rowSpan: 2, colSpan: 2 },
	},
	{
		src: '/images/events/dsc04979.jpg',
		alt: 'Cafe Cursor cups with the event logo',
		row: 1,
		col: 3,
		mobile: { row: 3, col: 1 },
	},
	{
		src: '/images/events/dsc05031.jpg',
		alt: 'Attendees chatting at the meetup cafe',
		row: 1,
		col: 4,
		rowSpan: 2,
		mobileHidden: true,
	},
	{
		src: '/images/events/dsc04994.jpg',
		alt: 'Cursor stickers on the event table',
		row: 2,
		col: 3,
		mobile: { row: 3, col: 2 },
	},
	{
		src: '/images/events/dsc04988.jpg',
		alt: 'Participants working together on laptops and a tablet',
		row: 3,
		col: 1,
		rowSpan: 2,
		mobileHidden: true,
	},
	{
		src: '/images/events/dsc05026.jpg',
		alt: 'Overview of the Cursor meetup in Guadalajara',
		row: 3,
		col: 2,
		rowSpan: 2,
		colSpan: 2,
		mobileHidden: true,
	},
	{
		src: '/images/events/dsc05021.jpg',
		alt: 'Builders coding at a long table during the event',
		row: 3,
		col: 4,
		rowSpan: 2,
		mobile: { row: 4, col: 1, colSpan: 2 },
	},
];
