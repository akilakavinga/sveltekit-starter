import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

let db: ReturnType<typeof drizzle> | null = null;

if (env.DATABASE_URL) {
	const client = neon(env.DATABASE_URL);
	db = drizzle(client, { schema });
}

export { db };
