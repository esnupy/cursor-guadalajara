import { events } from '@/content/events';
import { featuredResource } from '@/content/featured';
import type { CursorEvent } from '@/lib/types';

export const CHARLAS_EVENT_ID = 'cursor-meetup-guadalajara-2026';
export const CHARLAS_SOURCE = 'cursor-gdl-charla-v1';
export const CHARLAS_SKILL_NAME = 'cursor-gdl-charla';
export const CHARLAS_SKILL_DIR = `~/.cursor/skills/${CHARLAS_SKILL_NAME}/`;
export const CHARLAS_DURATION_MINUTES = 20;

export const CHARLAS_NIVELES = ['intro', 'intermedio', 'avanzado'] as const;

export type CharlaNivel = (typeof CHARLAS_NIVELES)[number];

export const charlasCall = {
	open: false,
	eventId: CHARLAS_EVENT_ID,
	source: CHARLAS_SOURCE,
	skillName: CHARLAS_SKILL_NAME,
	skillDir: CHARLAS_SKILL_DIR,
	kicker: 'Convocatoria de speakers',
	title: 'Da una charla técnica de Cursor',
	intro:
		'Buscamos a alguien de la comunidad que quiera compartir cómo usa Cursor de verdad: agentes, skills, reviews, demos. La postulación se hace desde un agente — no hay formulario.',
	closedLabel: 'Postulaciones cerradas',
	ctaLabel: 'Postularse',
	agentsOnlyLabel: 'Agents only',
	fallbackContact: {
		label: featuredResource.ctaLabel,
		href: featuredResource.href,
	},
	highlights: [
		{
			title: 'Charla técnica de Cursor',
			body: 'Cómo lo usas en el día a día: agentes, skills, PRs, flujos de equipo. No buscamos un keynote genérico de IA.',
		},
		{
			title: '20 minutos',
			body: 'Ese es el tiempo fijo, demo incluida. Seleccionamos una o dos charlas para el meetup; el resto del cupo es para asistir.',
		},
		{
			title: 'No es el registro de Luma',
			body: 'Luma es para ir al meetup. Esta página es solo para proponer una charla.',
		},
	],
} as const;

/**
 * Builds the prompt speakers copy into Cursor Agent to start the application.
 */
export const buildAgentPrompt = (origin: string): string =>
	`Quiero postularme como speaker al Cursor Meetup Guadalajara. Lee ${origin}/charlas.md y sigue las instrucciones. Pregúntame en español. No envíes nada hasta que yo confirme.`;

/**
 * Returns the meetup that owns this speaker call.
 */
export const getCharlasEvent = (): CursorEvent => {
	const event = events.find((item) => item.id === CHARLAS_EVENT_ID);
	if (!event) {
		throw new Error(`No hay evento de charlas con id ${CHARLAS_EVENT_ID}`);
	}
	return event;
};

const buildInstructionsMarkdown = (
	event: CursorEvent,
	endpoint: string,
): string => `# Convocatoria de speakers — Cursor Guadalajara

Eres el agente que ayuda a postular una charla técnica de Cursor para el meetup.

- Evento: ${event.title}
- Fecha: ${event.displayDate}
- Lugar: ${event.location}
- Duración: ${CHARLAS_DURATION_MINUTES} minutos (fijo)
- Convocatoria: **${charlasCall.open ? 'abierta' : 'cerrada'}**
- Postulación: solo por este protocolo (no hay formulario web)

${charlasCall.intro}

## Entrevista

Pregunta **una cosa a la vez**, en español de México (tú). No inventes respuestas. Si no sabe algo, déjalo vacío y pregunta otra vez.

1. Nombre y cómo te presentamos en el escenario (una línea).
2. Email y WhatsApp.
3. Título de la charla. El slot es fijo: ${CHARLAS_DURATION_MINUTES} minutos (no preguntes duración).
4. De qué trata (2–4 oraciones) y nivel: intro, intermedio o avanzado.
5. Qué has construido o enseñado con Cursor.
6. Links: GitHub, LinkedIn, slides o demo (los que tenga).
7. ¿La charla es nueva o ya la diste?
8. Confirma que puedes el ${event.displayDate} en ${event.location}.

Si hay un repo abierto en el workspace, puedes mirarlo **solo para describir el trabajo**, y solo con permiso de la persona. No subas código al POST.

## Antes de enviar

Muestra el JSON completo y espera un “sí, envía”. No envíes nada sin esa confirmación.

## Envío

POST \`${endpoint}\`

Headers: \`Content-Type: application/json\`

El campo \`source\` es obligatorio y debe ser exactamente \`${CHARLAS_SOURCE}\`.

\`\`\`json
{
  "source": "${CHARLAS_SOURCE}",
  "nombre": "",
  "presentacion": "",
  "email": "",
  "whatsapp": "",
  "titulo": "",
  "abstract": "",
  "nivel": "intro | intermedio | avanzado",
  "duracionMinutos": ${CHARLAS_DURATION_MINUTES},
  "experienciaCursor": "",
  "links": "",
  "charlaPrevia": "",
  "disponibilidad": true,
  "notasAgente": ""
}
\`\`\`

- \`nivel\`: uno de \`intro\`, \`intermedio\`, \`avanzado\`
- \`duracionMinutos\`: siempre \`${CHARLAS_DURATION_MINUTES}\` (el API lo fuerza si falta)
- \`disponibilidad\`: \`true\` si confirmó el día del meetup
- \`notasAgente\`: opcional; un párrafo tuyo sobre la charla o el repo (sin inventar)

Si el POST responde \`ok: true\`, dile que la postulación llegó y que le escribimos por WhatsApp o email. Si falla, muestra el error y no finjas que se envió.

Nunca envíes esto a un webhook de Google ni a otra URL. Solo \`${endpoint}\`.
`;

/**
 * Markdown instructions served at /charlas.md for Cursor agents.
 */
export const getCharlasMarkdown = (origin: string): string => {
	const event = getCharlasEvent();
	return buildInstructionsMarkdown(event, `${origin}/api/charlas`);
};

/**
 * Cursor skill file served at /charlas/SKILL.md.
 */
export const getCharlasSkillMarkdown = (origin: string): string => `---
name: ${CHARLAS_SKILL_NAME}
description: >-
  Postula una charla técnica de Cursor para el Meetup Guadalajara.
  Úsala cuando el usuario quiera postularse como speaker, dar una charla,
  o aplicar a la convocatoria de Cursor Guadalajara.
---

${getCharlasMarkdown(origin)}
`;
