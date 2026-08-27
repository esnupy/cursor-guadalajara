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

export const capClaimStatusEnum = pgEnum('cap_claim_status', ['queued', 'delivered', 'skipped']);
export const capClaimSourceEnum = pgEnum('cap_claim_source', ['luma', 'astrazeneca']);

export const meetupGuests = pgTable('meetup_guests', {
	email: citext('email').primaryKey(),
	name: text('name').notNull(),
	lumaGuestId: text('luma_guest_id'),
	approvalStatus: text('approval_status'),
});

export const capClaims = pgTable('cap_claims', {
	id: uuid('id').defaultRandom().primaryKey(),
	email: citext('email').notNull().unique(),
	handle: text('handle').notNull().unique(),
	name: text('name').notNull(),
	source: capClaimSourceEnum('source').notNull(),
	profilePublic: boolean('profile_public').notNull(),
	status: capClaimStatusEnum('status').notNull().default('queued'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	resolvedAt: timestamp('resolved_at', { withTimezone: true }),
	resolvedByEmail: text('resolved_by_email'),
});

export type AccessRole = (typeof accessRoleEnum.enumValues)[number];
export type AccessGrant = typeof accessGrants.$inferSelect;
export type NewAccessGrant = typeof accessGrants.$inferInsert;
export type CharlaSubmissionRow = typeof charlaSubmissions.$inferSelect;
export type CapClaimStatus = (typeof capClaimStatusEnum.enumValues)[number];
export type CapClaimSource = (typeof capClaimSourceEnum.enumValues)[number];
export type MeetupGuest = typeof meetupGuests.$inferSelect;
export type CapClaim = typeof capClaims.$inferSelect;
