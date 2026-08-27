import 'dotenv/config';

import { sql } from 'drizzle-orm';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { parseCsv } from '../caps/csv';

import { createDb } from './index';
import { meetupGuests } from './schema';

const csvPath = process.argv[2];

if (!csvPath) {
	console.error('Usage: bun run lib/db/import-meetup-guests.ts <path-to-luma-csv>');
	process.exit(1);
}

async function importGuests() {
	const records = parseCsv(readFileSync(resolve(csvPath), 'utf8'));
	const guests = records
		.map((record) => {
			const email = (record.email ?? '').trim().toLowerCase();
			const name = (record.name ?? '').trim();
			if (!email || !name) {
				return null;
			}
			return {
				email,
				name,
				lumaGuestId: (record.guest_id ?? '').trim() || null,
				approvalStatus: (record.approval_status ?? '').trim() || null,
			};
		})
		.filter((guest): guest is NonNullable<typeof guest> => guest !== null);

	if (guests.length === 0) {
		throw new Error('No guests found in CSV');
	}

	const db = createDb();
	await db
		.insert(meetupGuests)
		.values(guests)
		.onConflictDoUpdate({
			target: meetupGuests.email,
			set: {
				name: sql`excluded.name`,
				lumaGuestId: sql`excluded.luma_guest_id`,
				approvalStatus: sql`excluded.approval_status`,
			},
		});

	console.log(`Imported ${guests.length} guests`);
}

importGuests().catch((error) => {
	console.error(error);
	process.exit(1);
});
