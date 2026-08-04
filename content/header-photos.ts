import { HeaderPhoto } from '@/lib/types';

// Guadalajara community event photos for the hero bento grid.
// Desktop grid: 4 columns x 4 rows (16 cells).
export const headerPhotos: HeaderPhoto[] = [
	{
		src: '/images/events/dsc04984.jpg',
		alt: 'Comunidad de Cursor Guadalajara colaborando alrededor de una mesa',
		row: 1,
		col: 1,
		rowSpan: 2,
		colSpan: 2,
		mobile: { row: 1, col: 1, rowSpan: 2, colSpan: 2 },
	},
	{
		src: '/images/events/dsc04979.jpg',
		alt: 'Tazas de Cafe Cursor con el logo del evento',
		row: 1,
		col: 3,
		mobile: { row: 3, col: 1 },
	},
	{
		src: '/images/events/dsc05031.jpg',
		alt: 'Asistentes conversando en el café del meetup',
		row: 1,
		col: 4,
		rowSpan: 2,
		mobileHidden: true,
	},
	{
		src: '/images/events/dsc04994.jpg',
		alt: 'Stickers de Cursor en la mesa del evento',
		row: 2,
		col: 3,
		mobile: { row: 3, col: 2 },
	},
	{
		src: '/images/events/dsc04988.jpg',
		alt: 'Participantes trabajando juntos en laptops y una tablet',
		row: 3,
		col: 1,
		rowSpan: 2,
		mobileHidden: true,
	},
	{
		src: '/images/events/dsc05026.jpg',
		alt: 'Vista general del meetup de Cursor en Guadalajara',
		row: 3,
		col: 2,
		rowSpan: 2,
		colSpan: 2,
		mobileHidden: true,
	},
	{
		src: '/images/events/dsc05021.jpg',
		alt: 'Builders programando en una mesa larga durante el evento',
		row: 3,
		col: 4,
		rowSpan: 2,
		mobile: { row: 4, col: 1, colSpan: 2 },
	},
];
