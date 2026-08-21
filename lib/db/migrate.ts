import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

async function migrate() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL is not set');
	}

	const sql = neon(url);
	const migrationsDir = join(process.cwd(), 'lib/db/migrations');
	const files = readdirSync(migrationsDir)
		.filter((file) => file.endsWith('.sql'))
		.sort();

	for (const file of files) {
		const migrationSql = readFileSync(join(migrationsDir, file), 'utf8');
		const statements = migrationSql
			.split(';')
			.map((statement) => statement.trim())
			.filter(Boolean);

		for (const statement of statements) {
			await sql.query(statement);
		}
	}

	console.log('Migration applied successfully');
}

migrate().catch((error) => {
	console.error(error);
	process.exit(1);
});
