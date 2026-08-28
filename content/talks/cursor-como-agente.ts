import type { AssetSlide } from '@/components/talks/AssetDeck';

const slideBase = '/images/meetup-27-08-2026/cursor-como-agente/slides';
const videoBase = '/videos/meetup-27-08-2026/cursor-como-agente';

export const cursorComoAgenteTalk = {
	title: 'Cursor como agente: más allá de la interacción convencional',
	event: 'Meetup Guadalajara',
	date: '27 de agosto de 2026',
	path: '/meetup-27-08-2026/cursor-como-agente',
	description:
		'Cómo usar el CLI de Cursor para armar un sistema agéntico con skills, memoria y orquestación. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
	speaker: 'Alejandro Rentería',
	ogImage: {
		src: '/images/meetup-27-08-2026/cursor-como-agente/og.png',
		alt: 'Cursor como agente — Cursor Meetup Guadalajara, 27 de agosto de 2026',
		width: 1600,
		height: 837,
	},
} as const;

const slideAlts = [
	'Título: Cursor as an Agent',
	'Por qué el agente se muere al cerrar el IDE',
	'El proyecto: un agente personal en tu máquina',
	'Complementa Cursor IDE, no lo reemplaza',
	'Ventajas de extender Cursor con el CLI',
	'Arquitectura: quién piensa',
	'Skills: el comportamiento vive en un markdown',
	'Memoria: las reglas de la casa',
	'Canales de uso',
	'Demo de 30 segundos',
	'Repositorio en GitHub',
	'Gracias',
] as const;

export const cursorComoAgenteSlides: AssetSlide[] = slideAlts.map((alt, index) => {
	const n = index + 1;
	const id = `slide-${String(n).padStart(2, '0')}`;
	const src = `${slideBase}/${id}.webp`;

	if (n === 10) {
		return {
			id,
			type: 'video',
			src: `${videoBase}/demo-meetup-final.mp4`,
			poster: src,
			alt,
		};
	}

	return {
		id,
		type: 'image',
		src,
		alt,
	};
});
