import { boolean, customType, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const citext = customType<{ data: string }>({
	dataType() {
		return 'citext';
	},
});

export const accessRoleEnum = pgEnum('access_role', ['super_admin', 'ambassador', 'guest']);

export const accessGrants = pgTable('access_grants', {
	id: uuid('id').defaultRandom().primaryKey(),
	email: citext('email').notNull().unique(),
	role: accessRoleEnum('role').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
	createdByEmail: text('created_by_email'),
});

export const charlaSubmissions = pgTable('charla_submissions', {
	id: uuid('id').defaultRandom().primaryKey(),
	nombre: text('nombre').notNull(),
	presentacion: text('presentacion').notNull(),
	email: text('email').notNull(),
	whatsapp: text('whatsapp').notNull(),
	titulo: text('titulo').notNull(),
	abstract: text('abstract').notNull(),
	nivel: text('nivel').notNull(),
	duracionMinutos: integer('duracion_minutos').notNull(),
	experienciaCursor: text('experiencia_cursor').notNull(),
	links: text('links').notNull(),
	charlaPrevia: text('charla_previa').notNull(),
	disponibilidad: boolean('disponibilidad').notNull(),
	notasAgente: text('notas_agente'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type AccessRole = (typeof accessRoleEnum.enumValues)[number];
export type AccessGrant = typeof accessGrants.$inferSelect;
export type NewAccessGrant = typeof accessGrants.$inferInsert;
export type CharlaSubmissionRow = typeof charlaSubmissions.$inferSelect;
