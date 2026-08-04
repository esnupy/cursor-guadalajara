import { RecapData } from '@/lib/types';

// REPLACE: Copy this file, rename the slug, and replace all sample recap content.
// All subsections (speakers, projects, highlights, resources) are optional —
// include only the ones relevant to your event.
export const exampleEventRecap: RecapData = {
	slug: 'example-event',
	title: 'Cafe Cursor TuCiudad — Resumen',
	date: '14 de febrero de 2026',
	attendees: 38,
	summary: [
		'Builders se reunieron para un día colaborativo y práctico de desarrollo asistido por IA con Cursor.',
		'La gente compartió flujos de trabajo, hizo pair programming en proyectos e intercambió tips que otras comunidades pueden reutilizar.',
	],
	host: {
		name: 'Host Venue',
		logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop',
		url: 'https://example.com/venue',
	},

	// Speakers — who presented at the event and what they talked about
	speakers: [
		{
			name: 'Jane Doe',
			topic: 'Construir apps full-stack con Cursor y Claude',
			photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
			url: 'https://example.com/jane',
		},
		{
			name: 'Alex Chen',
			topic: 'De cero a deployado: sesión de live coding',
		},
	],

	// Projects — what attendees built or showcased
	projects: [
		{
			name: 'CursorBot',
			description:
				'Un bot de Slack construido enteramente con Cursor que responde preguntas del equipo usando docs internos.',
			author: 'Jane Doe',
			url: 'https://github.com/example/cursorbot',
		},
		{
			name: 'LocalMenu',
			description: 'Una app de menú de restaurante scaffolded en vivo durante el evento en menos de 30 minutos.',
			author: 'Alex Chen',
		},
	],

	// Highlights — memorable quotes, feedback, or stories from attendees
	highlights: [
		{
			quote: 'Saqué más en esta sesión de 3 horas que en mi último sprint.',
			author: 'Un asistente',
		},
		{
			quote: 'El mejor evento de comunidad al que he ido — todos estaban construyendo, no solo mirando.',
		},
	],

	// Resources — slides, repos, or links shared during the event
	resources: [
		{ label: 'Slides del taller', url: 'https://example.com/slides' },
		{ label: 'Repositorio starter', url: 'https://github.com/example/starter' },
	],

	photoCredits: [{ name: 'Voluntario de la comunidad' }, { name: 'Socio de fotos', url: 'https://example.com/' }],
	photos: [
		{
			src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
			alt: 'Miembros de la comunidad programando juntos',
		},
		{
			src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
			alt: 'Asistentes durante el taller',
		},
		{
			src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
			alt: 'Organizador hablando con los participantes',
		},
	],
};
