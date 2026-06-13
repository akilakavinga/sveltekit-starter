<script lang="ts">
	import { ThemeToggle } from '$lib/components/ui/theme-toggle';
	let { children } = $props();
</script>

<ThemeToggle />
{@render children()}
