import 'dotenv/config';

import { eq } from 'drizzle-orm';

import { createDb } from './index';
import { accessGrants } from './schema';

const SEED_EMAIL = 'juanda.martinezn@gmail.com';

async function seed() {
	const db = createDb();

	await db
		.insert(accessGrants)
		.values({
			email: SEED_EMAIL,
			role: 'super_admin',
			createdByEmail: 'seed',
		})
		.onConflictDoUpdate({
			target: accessGrants.email,
			set: {
				role: 'super_admin',
				updatedAt: new Date(),
			},
		});

	const [grant] = await db.select().from(accessGrants).where(eq(accessGrants.email, SEED_EMAIL));
	console.log('Seeded access grant:', grant);
}

seed().catch((error) => {
	console.error(error);
	process.exit(1);
});
