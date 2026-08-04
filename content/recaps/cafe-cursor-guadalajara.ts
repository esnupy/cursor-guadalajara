import { RecapData } from '@/lib/types';

export const cafeCursorGuadalajaraRecap: RecapData = {
	slug: 'cafe-cursor-guadalajara',
	title: 'Cafe Cursor Guadalajara — Resumen',
	date: '25 de abril de 2026 · 10:00–16:00',
	attendees: 55,
	summary: [
		'Guadalajara, ¡Cafe Cursor está de vuelta! Nos reunimos en Ventura Café para un Cafe Takeover: trae tu laptop, toma un café y dedica unas horas a sacar proyectos con Cursor — o simplemente pasa a conocer a la comunidad.',
		'No fue una conferencia ni un taller formal. Desarrolladores, diseñadores, estudiantes y cualquier persona curiosa sobre IA compartieron flujos de trabajo, se sentaron en mesas facilitadas por la comunidad y vieron cómo Cursor se integra al día a día.',
		'Había créditos de Cursor y café disponibles. El acceso se organizó en bloques: Mañana (10:00–13:00), Tarde (13:00–16:00) y Drop-By / General para quien solo quería pasar a saludar.',
	],
	host: {
		name: 'Ventura Café',
		logo: '/images/events/dsc04979.jpg',
		url: 'https://maps.google.com/?q=Ventura+Café+Guadalajara',
	},
	highlights: [
		{
			quote:
				'Llegué sin un plan claro y salí con una funcionalidad casi lista. Lo mejor fue preguntar a la gente de la mesa de al lado cómo estructuran sus prompts.',
			author: 'Asistente del bloque de mañana',
		},
		{
			quote:
				'No es un meetup típico de slides. Es café, laptops y gente que realmente está construyendo. Guadalajara se siente muy viva.',
			author: 'Participante del bloque de tarde',
		},
		{
			quote:
				'Solo pasé un rato y terminé hablando media hora sobre agentes y revisiones de código. Me registré para el siguiente sin pensarlo dos veces.',
			author: 'Visitante Drop-By',
		},
		{
			quote:
				'Los créditos de Cursor más un café de cortesía quitan la fricción. Te sientas, abres el editor y entras en modo build de inmediato.',
			author: 'Miembros de la comunidad',
		},
	],
	resources: [
		{ label: 'Comunidad Cursor Guadalajara', url: 'https://luma.com/cursor-guadalajara-mexico' },
		{ label: 'Comunidad Cursor', url: 'https://cursor.com/community' },
	],
	photoCredits: [{ name: 'Comunidad Cursor Guadalajara' }],
	photos: [
		{
			src: '/images/events/dsc04984.jpg',
			alt: 'Comunidad de Cursor Guadalajara colaborando alrededor de una mesa',
		},
		{
			src: '/images/events/dsc04979.jpg',
			alt: 'Tazas de Cafe Cursor con el logo del evento',
		},
		{
			src: '/images/events/dsc05031.jpg',
			alt: 'Asistentes conversando en Ventura Café',
		},
		{
			src: '/images/events/dsc04994.jpg',
			alt: 'Stickers de Cursor en la mesa del evento',
		},
		{
			src: '/images/events/dsc04988.jpg',
			alt: 'Participantes trabajando juntos en laptops',
		},
		{
			src: '/images/events/dsc05026.jpg',
			alt: 'Vista general de Cafe Cursor en Guadalajara',
		},
		{
			src: '/images/events/dsc05021.jpg',
			alt: 'Builders programando en una mesa larga durante el evento',
		},
		{
			src: '/images/events/dsc04963.jpg',
			alt: 'Un momento de Cafe Cursor Guadalajara',
		},
		{
			src: '/images/events/dsc04975.jpg',
			alt: 'Ambiente de coworking en Ventura Café',
		},
		{
			src: '/images/events/dsc05058.jpg',
			alt: 'Comunidad durante el Cafe Takeover',
		},
	],
};
