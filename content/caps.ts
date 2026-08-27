import { meetupPromo } from '@/content/meetups/meetup-27-08-2026';
import { CAP_LIMIT, CURSOR_PROFILE_CLAIM_URL } from '@/lib/caps/constants';

export const capGiveaway = {
	title: 'Gorras Cursor',
	capLimit: CAP_LIMIT,
	boardPath: `${meetupPromo.path}/gorras`,
	boardLinkLabel: 'Ver la fila',
	profileUrl: CURSOR_PROFILE_CLAIM_URL,
	profileLabel: 'Reclama tu handle en cursor.com/profile',
	pitch: `Hay ${CAP_LIMIT} gorras. Entra a la fila con el correo de tu registro en Luma y el handle de tu perfil de Cursor. Las primeras ${CAP_LIMIT} personas de la fila que estén en el check-in se llevan una. Si no estás, pasamos a la siguiente.`,
	azNote: 'Si trabajas en AstraZeneca y no te registraste en Luma, usa tu correo @astrazeneca.com.',
	emailLabel: 'Correo',
	handleLabel: 'Handle de Cursor',
	handlePlaceholder: 'tu-handle',
	nameLabel: 'Nombre',
	nameHint: 'Solo si entras con correo de AstraZeneca.',
	submitLabel: 'Entrar a la fila',
	submittingLabel: 'Entrando…',
	success: `Estás en la fila. Hay ${CAP_LIMIT} gorras. Mira la pantalla en el lobby y estate en el check-in. Si no estás, pasamos a la siguiente persona.`,
	alreadyJoined: `Ya estabas en la fila. Hay ${CAP_LIMIT} gorras. Mira la pantalla en el lobby y estate en el check-in. Si no estás, pasamos a la siguiente persona.`,
};

export const capBoard = {
	title: capGiveaway.title,
	adminLinkLabel: 'Ver tablero',
	deliveredLabel: 'entregadas',
	loadError: 'No se pudo actualizar la fila',
	status: {
		queued: 'En fila',
		delivered: 'Entregada',
	},
	remaining: (count: number) => (count === 1 ? 'Queda 1 lugar' : `Quedan ${count} lugares`),
};
