import { ambassadors } from '@/content/ambassadors';
import { skillhellTalk } from '@/content/talks/skillhell';

const juan = ambassadors.find((ambassador) => ambassador.name === 'Juan Daniel Martinez');
const alejandro = ambassadors.find((ambassador) => ambassador.name === 'Alejandro Rentería');
const rogelio = ambassadors.find((ambassador) => ambassador.name === 'Rogelio Hernández');

export const meetupPromo = {
	id: 'cursor-meetup-guadalajara-2026',
	path: '/meetup-27-08-2026',
	kicker: 'Primer meetup técnico',
	title: 'Cursor Meetup Guadalajara',
	date: '2026-08-27',
	displayDate: '27 de agosto de 2026',
	timeRange: '17:30–20:00',
	startDateTime: '2026-08-27T17:30:00-06:00',
	endDateTime: '2026-08-27T20:00:00-06:00',
	soldOut: true,
	lumaUrl: 'https://luma.com/hpk7julv',
	ogImage: {
		src: '/images/meetup-27-08-2026/og.jpg',
		alt: 'Cursor Meetup Guadalajara, 27 de agosto de 2026',
		width: 1024,
		height: 536,
	},
	location: {
		name: 'AstraZeneca GITC Guadalajara',
		address: 'Blvd. Puerta de Hierro 4965, Puerta de Hierro, 45116 Zapopan, Jal.',
		latitude: 20.7109842,
		longitude: -103.4113136,
		mapsUrl: 'https://www.google.com/maps/search/?api=1&query=AstraZeneca+GITC+Guadalajara',
		mapsEmbedUrl: 'https://www.google.com/maps?q=AstraZeneca+GITC+Guadalajara&hl=es-419&z=17&output=embed',
	},
	summary: [
		'Después de Café Cursor, el siguiente paso es un espacio más técnico: cuatro charlas relámpago de 20 minutos sobre cómo usar Cursor en el flujo de trabajo.',
		'AstraZeneca Guadalajara nos abre las puertas del GITC para recibirnos.',
	],
	agenda: [
		{ time: '17:30', label: 'Llegada, check-in y networking' },
		{ time: '17:50', label: 'Bloque 1 — dos charlas relámpago' },
		{ time: '18:30', label: 'Break para snacks y comunidad' },
		{ time: '19:00', label: 'Bloque 2 — dos charlas relámpago' },
		{ time: '19:40', label: 'Cierre y despedida' },
	],
	speakers: [
		{
			name: 'Juan Martínez',
			role: 'Design engineer · embajador',
			photo: '/images/meetup-27-08-2026/juan-martinez.jpg',
			talkTitle: 'Del skillhell al skillhalla',
			abstract:
				'Las skills encapsulan conocimiento para los agentes. El problema es el ruido: hay demasiadas, y cada vez cuesta más distinguir las que están bien hechas. Cómo identificar skills útiles, crearlas con criterio y pasar del caos a un ecosistema más confiable.',
			url: juan?.links.linkedin,
			slidesPath: skillhellTalk.path,
		},
		{
			name: 'Alejandro Rentería',
			role: 'Angular developer · embajador',
			photo: '/images/meetup-27-08-2026/alejandro-renteria.png',
			talkTitle: 'Cursor como agente más allá de la interacción convencional',
			abstract:
				'Cómo usar el CLI de Cursor para armar un sistema agéntico con habilidades, memoria y orquestación — sin frameworks ni servicios externos de IA. Una arquitectura framework-free para convertir la terminal en un compañero autónomo.',
			url: alejandro?.links.linkedin,
		},
		{
			name: 'Rogelio Hernández',
			role: 'Product lead · embajador',
			photo: '/images/meetup-27-08-2026/rogelio-hernandez.png',
			talkTitle: 'How to babysit agents',
			abstract:
				'Cómo pasar de una idea a agentes que hagan lo que esperamos dentro de Cursor: guiar, supervisar y ajustar para obtener mejores resultados y evitar el slop.',
			url: rogelio?.links.linkedin,
		},
		{
			name: 'Andrés Fernández',
			role: 'VP of product',
			photo: '/images/meetup-27-08-2026/andres-fernandez.jpg',
			talkTitle: 'GrokBot: cuida mi enfoque, Cursor codea',
			abstract:
				'GrokBot para investigar, pensar y mantener el enfoque; Cursor para convertir esas decisiones en producto. Cómo combinar ambas herramientas para ir de una idea a algo construido sin perderse en el camino.',
		},
	],
} as const;
