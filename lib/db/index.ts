import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';

function getDatabaseUrl() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL is not set');
	}
	return url;
}

export function createDb() {
	const sql = neon(getDatabaseUrl());
	return drizzle(sql, { schema });
}

let dbInstance: ReturnType<typeof createDb> | null = null;

export function getDb() {
	if (!dbInstance) {
		dbInstance = createDb();
	}
	return dbInstance;
}
