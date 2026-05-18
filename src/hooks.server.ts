import { authHandler } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const mainHandler: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export const handle: Handle = sequence(authHandler, mainHandler);
