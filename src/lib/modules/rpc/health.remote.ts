
import { query } from '$app/server';
import { db } from '$lib/server/db';

export const getDbHealth = query(async () => {
	if (!db) return { connected: false };
	return { connected: true };
});
