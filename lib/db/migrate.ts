import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

async function migrate() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL is not set');
	}

	const sql = neon(url);
	const migrationSql = readFileSync(join(process.cwd(), 'lib/db/migrations', '0000_init.sql'), 'utf8');
	const statements = migrationSql
		.split(';')
		.map((statement) => statement.trim())
		.filter(Boolean);

	for (const statement of statements) {
		await sql.query(statement);
	}

	console.log('Migration applied successfully');
}

migrate().catch((error) => {
	console.error(error);
	process.exit(1);
});
