import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';

// Delete the following code snippet when DATABASE_URL is defined permanently
let db: ReturnType<typeof drizzle> | null = null;

if (DATABASE_URL) {
	const client = neon(DATABASE_URL);
	db = drizzle(client, { schema });
}

export { db };

// De-Comment the following code snippet when DATABASE_URL is defined permanently.

// if (!DATABASE_URL) {
//   throw new Error('DATABASE_URL is not defined');
// }

// const client = neon(DATABASE_URL);
// const	db = drizzle(client, { schema });
