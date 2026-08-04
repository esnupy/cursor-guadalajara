import { customType, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

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

export type AccessRole = (typeof accessRoleEnum.enumValues)[number];
export type AccessGrant = typeof accessGrants.$inferSelect;
export type NewAccessGrant = typeof accessGrants.$inferInsert;
