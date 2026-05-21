<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ThemeToggle } from '$lib/components/ui/theme-toggle';

	let { children } = $props();
</script>

{#snippet lnk(href: string, text: string)}
	<Button size="lg" variant="link" class="text-2xl font-serif tracking-tighter" {href}>{text}</Button>
{/snippet}

<main class="h-full">
	{@render children()}
	<ThemeToggle />
	<div class="absolute top-4 left-4">
			{@render lnk('/', 'home')}
			{@render lnk('/sign-in', 'sign-in')}
			{@render lnk('/sign-up', 'sign-up')}
	</div>
</main>
