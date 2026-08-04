import { HeaderPhoto } from '@/lib/types';

// Guadalajara community event photos for the hero bento grid.
// Desktop grid: 4 columns x 4 rows (16 cells).
export const headerPhotos: HeaderPhoto[] = [
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC04984-highres-1785870046318.webp',
		alt: 'Comunidad de Cursor Guadalajara colaborando alrededor de una mesa',
		row: 1,
		col: 1,
		rowSpan: 2,
		colSpan: 2,
		mobile: { row: 1, col: 1, rowSpan: 2, colSpan: 2 },
	},
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC04979-highres-1785870168355.webp',
		alt: 'Vasos de Cafe Cursor con el logo del evento',
		row: 1,
		col: 3,
		mobile: { row: 3, col: 1 },
	},
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC05031-highres-1785870464745.webp',
		alt: 'Asistentes conversando en el café del meetup',
		row: 1,
		col: 4,
		rowSpan: 2,
		mobileHidden: true,
	},
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC04994-highres-1785870284638.webp',
		alt: 'Builders programando en una mesa larga durante el evento',
		row: 2,
		col: 3,
		mobile: { row: 3, col: 2 },
	},
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC04988-highres-1785870235462.webp',
		alt: 'Participantes trabajando juntos en laptops y una tablet',
		row: 3,
		col: 1,
		rowSpan: 2,
		mobileHidden: true,
	},
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC05026-highres-1785870405895.webp',
		alt: 'Vista general del meetup de Cursor en Guadalajara',
		row: 3,
		col: 2,
		rowSpan: 2,
		colSpan: 2,
		mobileHidden: true,
	},
	{
		src: 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/landing/DSC05021-highres-1785870366155.webp',
		alt: 'Stickers de Cursor en la mesa del evento',
		row: 3,
		col: 4,
		rowSpan: 2,
		mobile: { row: 4, col: 1, colSpan: 2 },
	},
];
