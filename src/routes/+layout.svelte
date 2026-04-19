<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {ModeWatcher} from 'mode-watcher';
	import { ThemeToggle } from '$lib/components/ui/theme-toggle';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher/>

<main class="relative">
  {@render children()}
  <ThemeToggle />
</main>
