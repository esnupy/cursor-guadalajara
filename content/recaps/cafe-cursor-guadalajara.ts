import { GalleryPhoto, RecapData } from '@/lib/types';

const blob = 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/cafe-cursor-25-04-2026';

const photo = (file: string, alt: string): GalleryPhoto => ({
	src: `${blob}/${file}`,
	alt,
});

const shots = {
	dsc04948: photo(
		'DSC04948-1790101507538.webp',
		'Participantes trabajando en laptops junto a la ventana de Ventura Café',
	),
	dsc04954: photo('DSC04954-1790101507934.webp', 'Conversación alrededor de una laptop durante Cafe Cursor'),
	dsc04956: photo('DSC04956-1790101509364.webp', 'Asistentes reunidos en una mesa de Ventura Café'),
	dsc04958: photo('DSC04958-1790101513422.webp', 'Builders programando en una mesa de madera'),
	dsc04961: photo('DSC04961-1790101516410.webp', 'Participantes con laptops en una mesa larga'),
	dsc04963: photo('DSC04963-1790101517554.webp', 'Comunidad de Cafe Cursor Guadalajara en el patio de Ventura Café'),
	dsc04970: photo('DSC04970-1790101518826.webp', 'Asistentes saludándose en el patio del café'),
	dsc04972: photo('DSC04972-1790101522217.webp', 'Entrada de Ventura Café durante Cafe Cursor'),
	dsc04975: photo('DSC04975-1790101525642.webp', 'Stickers de Cursor junto a un café en la mesa'),
	dsc04976: photo('DSC04976-1790101527837.webp', 'Participantes trabajando con laptop y tablet'),
	dsc04978: photo('DSC04978-1790101529837.webp', 'Builders programando en un rincón de Ventura Café'),
	dsc04979: photo('DSC04979-1790101533961.webp', 'Vasos y café de Cafe Cursor en el mostrador'),
	dsc04984: photo('DSC04984-1790101537816.webp', 'Comunidad colaborando alrededor de una mesa'),
	dsc04988: photo('DSC04988-1790101538317.webp', 'Participantes trabajando juntos en laptop y tablet'),
	dsc04994: photo('DSC04994-1790101540346.webp', 'Builders programando junto a la ventana del café'),
	dsc04997: photo('DSC04997-1790101547500.webp', 'Asistentes conversando en la entrada de Ventura Café'),
	dsc05000: photo('DSC05000-1790101543427.webp', 'Participante trabajando en una laptop con stickers de Cursor'),
	dsc05006: photo('DSC05006-1790101545682.webp', 'Fachada de Ventura Café, sede de Cafe Cursor'),
	dsc05010: photo('DSC05010-1790101549318.webp', 'Conversación en una mesa de trabajo durante el evento'),
	dsc05012: photo('DSC05012-1790101552145.webp', 'Entrada al café durante Cafe Cursor Guadalajara'),
	dsc05014: photo('DSC05014-1790101555118.webp', 'Asistentes alrededor de una mesa con laptops y stickers'),
	dsc05021: photo('DSC05021-1790101555717.webp', 'Stickers de Cursor sobre la mesa del evento'),
	dsc05026: photo('DSC05026-1790101562400.webp', 'Vista general de Cafe Cursor en Ventura Café'),
	dsc05028: photo('DSC05028-1790101564036.webp', 'Asistentes conversando de pie durante el evento'),
	dsc05029: photo('DSC05029-1790101563725.webp', 'Comunidad reunida al fondo del café'),
	dsc05030: photo('DSC05030-1790101572029.webp', 'Participante trabajando con café y un croissant'),
	dsc05031: photo('DSC05031-1790101575277.webp', 'Asistentes conversando junto a la barra de Ventura Café'),
	dsc05032: photo('DSC05032-1790101575156.webp', 'Builders trabajando en mesas junto a la ventana'),
	dsc05034: photo('DSC05034-1790101579056.webp', 'Mesas de trabajo llenas durante Cafe Cursor'),
	dsc05037: photo('DSC05037-1790101584911.webp', 'Participantes conversando en una mesa del café'),
	dsc05038: photo('DSC05038-1790101584792.webp', 'Asistentes sentados en una mesa de Ventura Café'),
	dsc05040: photo('DSC05040-1790101587209.webp', 'Conversación en una mesa durante Cafe Cursor'),
	dsc05042: photo('DSC05042-1790101593615.webp', 'Participantes platicando frente a sus laptops'),
	dsc05045: photo('DSC05045-1790101594893.webp', 'Vista del café con la comunidad trabajando'),
	dsc05048: photo('DSC05048-1790101594075.webp', 'Asistentes conversando entre las mesas del evento'),
	dsc05050: photo('DSC05050-1790101600981.webp', 'Comunidad colaborando en una mesa larga'),
	dsc05052: photo('DSC05052-1790101604752.webp', 'Ventana de Ventura Café durante Cafe Cursor'),
	dsc05058: photo('DSC05058-1790101604675.webp', 'Comunidad de Cafe Cursor Guadalajara reunida en el patio'),
};

export const cafeCursorGuadalajaraPhotos: GalleryPhoto[] = Object.values(shots);

/** Homepage mosaic: patio group photo plus four supporting shots. */
export const cafeCursorGuadalajaraCard = {
	thumbnail: shots.dsc04963.src,
	galleryImages: [shots.dsc04975.src, shots.dsc05058.src, shots.dsc05026.src, shots.dsc05021.src],
	hostLogo: shots.dsc04979.src,
};

export const cafeCursorGuadalajaraRecap: RecapData = {
	slug: 'cafe-cursor-guadalajara',
	title: 'Café Cursor Guadalajara',
	date: '25 de abril de 2026 · 10:00–16:00',
	attendees: 55,
	summary: [
		'Guadalajara, ¡Cafe Cursor está de vuelta! Nos reunimos en Ventura Café para un Cafe Takeover: trae tu laptop, toma un café y dedica unas horas a sacar proyectos con Cursor — o simplemente pasa a conocer a la comunidad.',
		'No fue una conferencia ni un taller formal. Desarrolladores, diseñadores, estudiantes y cualquier persona curiosa sobre IA compartieron flujos de trabajo, se sentaron en mesas facilitadas por la comunidad y vieron cómo Cursor se integra al día a día.',
		'Había créditos de Cursor y café disponibles. El acceso se organizó en bloques: Mañana (10:00–13:00), Tarde (13:00–16:00) y Drop-By / General para quien solo quería pasar a saludar.',
	],
	host: {
		name: 'Ventura Café',
		logo: cafeCursorGuadalajaraCard.hostLogo,
		url: 'https://maps.google.com/?q=Ventura+Café+Guadalajara',
	},
	highlights: [],
	resources: [
		{ label: 'Comunidad Cursor Guadalajara', url: 'https://luma.com/cursor-guadalajara-mexico' },
		{ label: 'Comunidad Cursor', url: 'https://cursor.com/community' },
	],
	photoCredits: [{ name: 'Comunidad Cursor Guadalajara' }],
	photos: cafeCursorGuadalajaraPhotos,
};
