<script lang="ts">
	import { ThemeToggle } from '$lib/components/ui/theme-toggle';

	let { children } = $props();
</script>

<main class="relative">
  {@render children()}
  <ThemeToggle />
</main>
