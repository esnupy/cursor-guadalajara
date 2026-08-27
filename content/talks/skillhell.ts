import { ambassadors } from '@/content/ambassadors';

export const skillhellTalk = {
	title: ['Del Skill-hell', 'al Skill-halla'],
	event: 'Meetup Guadalajara',
	date: '27 de agosto de 2026',
	path: '/meetup-27-08-2026/del-skillhell-al-skillhalla',
};

export const easingTree = `¿El elemento entra o sale del viewport?
├── Sí → ease-out
└── No
    ├── ¿Se mueve o cambia de forma en pantalla?
    │   └── Sí → ease-in-out
    └── ¿Es un cambio de hover?
        ├── Sí → ease
        └── ¿Es movimiento constante?
            ├── Sí → linear
            └── Por defecto → ease-out`;

export const skillhellSpeaker =
	ambassadors.find((ambassador) => ambassador.name === 'Juan Daniel Martinez') ?? ambassadors[0];

/** Drop each example still in `public/images/deck/` or change `exampleSrc`. */
export const mapItems = [
	{
		label: 'Trigger',
		detail: '¿La invoca el usuario o el modelo? El modelo no siempre acierta.',
		exampleSrc: '/images/deck/map-trigger.gif',
		exampleAlt: 'Ejemplo de trigger',
	},
	{
		label: 'Structure',
		detail: 'El proceso va aquí. Los detalles, en referencias.',
		exampleSrc: '/images/deck/map-structure.gif',
		exampleAlt: 'Ejemplo de structure',
	},
	{
		label: 'Steering',
		detail: 'Una palabra precisa vale más que un párrafo.',
		exampleSrc: '/images/deck/map-steering.webp',
		exampleAlt: 'Ejemplo de steering',
	},
	{
		label: 'Pruning',
		detail: 'Si sobra texto, recorta. El resultado debería ser el mismo.',
	},
] as const;
