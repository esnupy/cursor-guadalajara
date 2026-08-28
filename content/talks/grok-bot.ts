import type { AssetSlide } from '@/components/talks/AssetDeck';

const slideBase = '/images/meetup-27-08-2026/grok-bot-cuida-mi-enfoque/slides';

export const grokBotTalk = {
	title: 'GrokBot: cuida mi enfoque, Cursor codea',
	event: 'Meetup Guadalajara',
	date: '27 de agosto de 2026',
	path: '/meetup-27-08-2026/grok-bot-cuida-mi-enfoque',
	description:
		'GrokBot para investigar, pensar y mantener el enfoque; Cursor para convertir esas decisiones en producto. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
	speaker: 'Andrés Fernández',
	ogImage: {
		src: '/images/meetup-27-08-2026/grok-bot-cuida-mi-enfoque/og.png',
		alt: 'GrokBot cuida mi enfoque. Cursor codea — Cursor Meetup Guadalajara, 27 de agosto de 2026',
		width: 1600,
		height: 837,
	},
} as const;

const slideAlts = [
	'GrokBot: cuida mi enfoque, Cursor codea',
	'Lots of meetings factory',
	'Trabajo administrativo',
	'OpenClaw a Hermes a Grok Bot',
	'Quitar trabajo de mi plato',
	'Anatomía del operador',
	'Tres formas de organizar agentes',
	'De señales dispersas a tres decisiones',
	'La señal Integration',
	'Morning Brief y límites de decisión',
	'Delega una tarea aburrida mañana',
	'Opcional: Odyssey IMAX',
	'Opcional: ejercicio de 30 segundos',
] as const;

export const grokBotSlides: AssetSlide[] = slideAlts.map((alt, index) => {
	const n = index + 1;
	const id = `slide-${String(n).padStart(2, '0')}`;
	return {
		id,
		type: 'image' as const,
		src: `${slideBase}/${id}.webp`,
		alt,
	};
});
