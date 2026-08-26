import { ambassadors } from '@/content/ambassadors';

export const skillhellTalk = {
	title: 'Del skillhell al skillhalla',
	event: 'Cursor Meetup Guadalajara',
	date: '27 de agosto de 2026',
	path: '/meetup-27-08-2026/del-skillhell-al-skillhalla',
};

/**
 * Pega el GIF en `public/images/talks/` y pon aquí la ruta.
 * Ejemplo: '/images/talks/easing-demo.gif'
 */
export const easingDemoGifSrc: string | null = null;

export const easingDemoGifAlt = 'Demo de easing recorriendo el árbol de decisión';

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

export const mapItems = [
	{
		label: 'Trigger',
		detail: '¿La invoca el usuario o el modelo? El modelo no siempre acierta.',
	},
	{
		label: 'Structure',
		detail: 'El proceso va aquí. Los detalles, en referencias.',
	},
	{
		label: 'Steering',
		detail: 'Una palabra precisa vale más que un párrafo.',
	},
	{
		label: 'Pruning',
		detail: 'Si sobra texto, recorta. El resultado debería ser el mismo.',
	},
] as const;
