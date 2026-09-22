import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { GalleryPhoto, RecapData } from '@/lib/types';

const blob = 'https://n6j6oimzljzhdeal.public.blob.vercel-storage.com/cursor-meetup-27-08-2026';

const groupPhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-6-1790100779908.webp`,
	alt: 'Comunidad del Cursor Meetup Guadalajara reunida en el auditorio',
};

const stagePhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-1790100782627.webp`,
	alt: 'Ponente frente a la pantalla durante el Cursor Meetup en AstraZeneca GITC',
};

const speakerClosePhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-2-1790100775325.webp`,
	alt: 'Ponente con micrófono durante una charla del Cursor Meetup',
};

const skillsTalkPhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-3-1790100775528.webp`,
	alt: 'Charla sobre skills en el Cursor Meetup Guadalajara',
};

const babysitTalkPhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-4-1790100775163.webp`,
	alt: 'Charla How to babysit agents en el Cursor Meetup',
};

const odysseyTalkPhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-5-1790100778569.webp`,
	alt: 'Charla con la demo de Odyssey durante el Cursor Meetup',
};

const shirtsPhoto: GalleryPhoto = {
	src: `${blob}/Curso%20Innovation-7-1790100780126.webp`,
	alt: 'Entrega de playeras de Cursor al cierre del meetup',
};

const questionPhoto: GalleryPhoto = {
	src: `${blob}/cursor-1790100789961.webp`,
	alt: 'Asistente hace una pregunta durante el meetup',
};

const commentPhoto: GalleryPhoto = {
	src: `${blob}/cursor-2-1790100783218.webp`,
	alt: 'Participante comenta desde su asiento en el auditorio',
};

const breakPhoto: GalleryPhoto = {
	src: `${blob}/cursor-3-1790100783634.webp`,
	alt: 'Asistentes conversan en el break del Cursor Meetup',
};

export const cursorMeetupGuadalajaraPhotos: GalleryPhoto[] = [
	groupPhoto,
	stagePhoto,
	speakerClosePhoto,
	skillsTalkPhoto,
	babysitTalkPhoto,
	odysseyTalkPhoto,
	questionPhoto,
	commentPhoto,
	shirtsPhoto,
	breakPhoto,
];

/** Homepage mosaic: group photo plus four supporting shots. */
export const cursorMeetupGuadalajaraCard = {
	thumbnail: groupPhoto.src,
	galleryImages: [stagePhoto.src, babysitTalkPhoto.src, commentPhoto.src, breakPhoto.src],
};

export const cursorMeetupGuadalajaraRecap: RecapData = {
	slug: 'cursor-meetup-guadalajara',
	title: meetupPromo.title,
	date: `${meetupPromo.displayDate} · ${meetupPromo.timeRange}`,
	summary: [...meetupPromo.summary],
	host: {
		name: meetupPromo.location.name,
		url: meetupPromo.location.mapsUrl,
	},
	speakers: meetupPromo.speakers.map((speaker) => ({
		name: speaker.name,
		role: speaker.role,
		photo: speaker.photo,
		topic: speaker.talkTitle,
		abstract: speaker.abstract,
		url: 'url' in speaker ? speaker.url : undefined,
		slidesPath: speaker.slidesPath,
	})),
	resources: [
		{ label: 'Comunidad Cursor Guadalajara', url: 'https://luma.com/cursor-guadalajara-mexico' },
		{ label: 'Comunidad Cursor', url: 'https://cursor.com/community' },
	],
	photos: cursorMeetupGuadalajaraPhotos,
};
