<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { ThemeToggle } from '$lib/components/ui/theme-toggle';

	let { children } = $props();
</script>

{#snippet lnk(href: string, text: string)}
	<Button size="lg" variant="link" class="font-serif text-3xl" {href}>{text}</Button>
{/snippet}

<main class="relative min-h-screen">
	{@render children()}
	<ThemeToggle />
	<div class="absolute bottom-4 left-4">
		{#if page.url.pathname === '/login'}
			{@render lnk('/', 'home')}
		{:else}
			{@render lnk('/login', 'login')}
		{/if}
	</div>
</main>
