import { siteConfig } from '@/content/site.config';
import type { LegalDocument } from '@/lib/types';

const privacyMailto = `mailto:${siteConfig.privacyEmail}`;

export const privacidad: LegalDocument = {
	path: '/privacidad',
	title: 'Aviso de privacidad',
	description:
		'Cómo Cursor Guadalajara usa los datos de quienes se registran a eventos en Luma y de quienes participan en actividades de este sitio.',
	updatedAt: '2026-08-28',
	updatedLabel: '28 de agosto de 2026',
	sections: [
		{
			title: 'Quiénes somos',
			blocks: [
				[
					{
						type: 'text',
						text: 'Cursor Guadalajara es una comunidad local de gente que usa Cursor. Este sitio lo armamos embajadores de la comunidad. No somos Cursor Inc. ni un producto oficial.',
					},
				],
				[
					{
						type: 'text',
						text: 'Este aviso dice qué datos personales usamos cuando organizamos eventos y actividades en cursorguadalajara.com. Quien responde peticiones sobre esos datos es quien organice en ese momento.',
					},
				],
				[
					{ type: 'text', text: 'Escríbenos a ' },
					{ type: 'link', href: privacyMailto, label: siteConfig.privacyEmail, external: true },
				],
			],
		},
		{
			title: 'El registro es en Luma',
			blocks: [
				[
					{ type: 'text', text: 'Los eventos se publican en ' },
					{ type: 'link', href: siteConfig.lumaUrl, label: 'Luma', external: true },
				],
				[
					{
						type: 'text',
						text: 'Cuando te registras, le das tus datos a Luma, no a este sitio. Luma tiene su propia política. Nosotros a veces exportamos el CSV de asistentes y lo guardamos un rato en nuestra base de datos.',
					},
				],
			],
		},
		{
			title: 'Qué tomamos de esa lista',
			blocks: [
				[
					{
						type: 'text',
						text: 'Nombre, correo y lo demás que venga en la exportación. Si Luma incluye empresa, tipo de boleto o estado de check-in, eso también puede llegar.',
					},
				],
			],
		},
		{
			title: 'Para qué lo usamos',
			blocks: [
				[
					{
						type: 'text',
						text: 'El día del evento, para saber quién está registrado y controlar el acceso.',
					},
				],
				[
					{
						type: 'text',
						text: 'En este sitio, a veces armamos actividades solo para asistentes. Ahí usamos nombre y correo para comprobar que sí vas. A veces te pedimos que los confirmes tú.',
					},
				],
				[
					{
						type: 'text',
						text: 'No usamos esa lista para vender nada ni para mandar campañas. Si más adelante una actividad necesita otro uso, lo decimos en esa misma pantalla.',
					},
				],
			],
		},
		{
			title: 'Cuánto tiempo lo guardamos',
			blocks: [
				[
					{
						type: 'text',
						text: 'Cuando el evento termina, borramos esa lista. Si una actividad necesita conservar algo más tiempo, lo avisamos ahí. Si no lo decimos, asume que se va con el evento.',
					},
				],
			],
		},
		{
			title: 'Otras cosas que pedimos en el sitio',
			blocks: [
				[
					{
						type: 'text',
						text: 'Si abrimos una convocatoria de charlas, pedimos nombre, correo, WhatsApp y datos de la propuesta. Eso es para elegir speakers, no para marketing.',
					},
				],
				[
					{
						type: 'text',
						text: 'Los correos de quien administra el sitio (embajadores y accesos) viven en una lista aparte. No salen del CSV de Luma.',
					},
				],
			],
		},
		{
			title: 'Qué no hacemos',
			blocks: [
				[
					{
						type: 'text',
						text: 'No medimos visitas. No hay analytics ni píxeles de seguimiento en este sitio.',
					},
				],
				[
					{
						type: 'text',
						text: 'Si una página de evento trae un mapa de Google, Google puede recoger datos por su cuenta. Eso es de ellos, no nuestro.',
					},
				],
			],
		},
		{
			title: 'Dónde vive la información',
			blocks: [
				[
					{
						type: 'text',
						text: 'El sitio corre en Vercel. La base de datos está en Neon. El registro de eventos lo opera Luma. No vendemos ni rentamos tus datos.',
					},
				],
			],
		},
		{
			title: 'Tus derechos',
			blocks: [
				[
					{
						type: 'text',
						text: 'Puedes pedir que te digamos qué tenemos de ti, que lo corrijamos o que lo borremos. También puedes oponerte a un uso concreto. Escribe con tu nombre, el correo con el que te registraste y qué quieres que hagamos. Respondemos lo antes que podamos.',
					},
				],
				[{ type: 'link', href: privacyMailto, label: siteConfig.privacyEmail, external: true }],
			],
		},
		{
			title: 'Cambios',
			blocks: [
				[
					{
						type: 'text',
						text: 'Si cambia cómo usamos los datos, actualizamos esta página. La fecha de arriba es la versión que aplica.',
					},
				],
				[
					{ type: 'text', text: 'El uso de este sitio también se rige por los ' },
					{ type: 'link', href: '/terminos', label: 'términos de uso' },
				],
			],
		},
	],
};

export const terminos: LegalDocument = {
	path: '/terminos',
	title: 'Términos de uso',
	description:
		'Reglas simples para usar el sitio de Cursor Guadalajara y participar en eventos y actividades de la comunidad.',
	updatedAt: '2026-08-28',
	updatedLabel: '28 de agosto de 2026',
	sections: [
		{
			title: 'Este sitio',
			blocks: [
				[
					{
						type: 'text',
						text: 'cursorguadalajara.com es el sitio de la comunidad Cursor Guadalajara. Lo mantienen embajadores locales. No es un sitio oficial de Cursor Inc.',
					},
				],
				[
					{ type: 'text', text: 'Al usarlo aceptas estos términos y el ' },
					{ type: 'link', href: '/privacidad', label: 'aviso de privacidad' },
				],
			],
		},
		{
			title: 'Eventos',
			blocks: [
				[
					{ type: 'text', text: 'El registro a meetups y cafés es en ' },
					{ type: 'link', href: siteConfig.lumaUrl, label: 'Luma', external: true },
				],
				[
					{
						type: 'text',
						text: 'Ahí aplican sus reglas. Nosotros podemos usar la lista de asistentes como dice el aviso de privacidad: control el día del evento y actividades solo para quien sí va.',
					},
				],
				[
					{
						type: 'text',
						text: 'Podemos cambiar horario, sede o cancelar. Avisamos por Luma o por este sitio cuando podemos. Un registro no te garantiza un lugar si el cupo se llena o el venue pone un tope.',
					},
				],
			],
		},
		{
			title: 'Actividades en el sitio',
			blocks: [
				[
					{
						type: 'text',
						text: 'A veces hay dinámicas, colas o beneficios en este dominio. Pueden estar limitadas a asistentes registrados. Si no estás en la lista, no hay obligación de darte acceso.',
					},
				],
				[
					{
						type: 'text',
						text: 'No intentes entrar con el correo de otra persona. Si vemos abuso, podemos quitar el acceso a esa actividad.',
					},
				],
			],
		},
		{
			title: 'Contenido',
			blocks: [
				[
					{
						type: 'text',
						text: 'Textos, fotos y recaps son de la comunidad o de quien se acredite en la página. Cursor, el cubo y las marcas relacionadas son de Cursor. No los uses como si fueran tuyos.',
					},
				],
			],
		},
		{
			title: 'Contacto',
			blocks: [
				[{ type: 'text', text: 'Dudas sobre el sitio o estos términos:' }],
				[{ type: 'link', href: privacyMailto, label: siteConfig.privacyEmail, external: true }],
			],
		},
	],
};
