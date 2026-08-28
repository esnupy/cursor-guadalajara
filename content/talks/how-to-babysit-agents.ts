import type { AssetSlide, VideoInset } from '@/components/talks/AssetDeck';

const slideBase = '/images/meetup-27-08-2026/how-to-babysit-agents/slides';
const videoBase = '/videos/meetup-27-08-2026/how-to-babysit-agents';

/** Right-panel window shared by PLAN / MULTITASK / STEER slides. */
const demoInset: VideoInset = {
	left: '45%',
	top: '24%',
	width: '50%',
	height: '52%',
};

export const howToBabysitAgentsTalk = {
	title: 'How to babysit agents',
	event: 'Meetup Guadalajara',
	date: '27 de agosto de 2026',
	path: '/meetup-27-08-2026/how-to-babysit-agents',
	description:
		'Cómo pasar de una idea a agentes que hagan lo que esperamos dentro de Cursor: guiar, supervisar y ajustar. Cursor Meetup Guadalajara, 27 de agosto de 2026.',
	speaker: 'Rogelio Hernández',
	ogImage: {
		src: '/images/meetup-27-08-2026/how-to-babysit-agents/og.png',
		alt: 'How to babysit agents — Cursor Meetup Guadalajara, 27 de agosto de 2026',
		width: 1600,
		height: 837,
	},
} as const;

const slideAlts = [
	'Título: How to babysit agents',
	'Estadísticas de uso de Cursor',
	'Cuidar es el trabajo',
	'PLAN — Shift+Tab',
	'MULTITASK — varios a la vez',
	'WATCH — ve lo que el agente está haciendo',
	'STEER — steer, not stop',
	'Para, revert, prompt, relanza',
	'Gracias y preguntas',
] as const;

const videoBySlide: Record<number, string> = {
	4: `${videoBase}/planmode.mp4`,
	5: `${videoBase}/multitask.mp4`,
	7: `${videoBase}/steer.mp4`,
};

export const howToBabysitAgentsSlides: AssetSlide[] = slideAlts.map((alt, index) => {
	const n = index + 1;
	const id = `slide-${String(n).padStart(2, '0')}`;
	const image = `${slideBase}/${id}.webp`;
	const video = videoBySlide[n];

	if (video) {
		return {
			id,
			type: 'composite',
			image,
			video,
			alt,
			inset: demoInset,
		};
	}

	return {
		id,
		type: 'image',
		src: image,
		alt,
	};
});
