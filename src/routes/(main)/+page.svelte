<script lang="ts">
	import { getDbHealth } from './index.remote';
</script>

{#snippet status(bool: boolean)}
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div class={['aspect-square w-2 rounded-full', bool ? 'bg-green-500' : 'bg-red-500']} />
{/snippet}

<div class="grid min-h-svh place-items-center border-2 border-red-500/30">
	<ul class="w-75 rounded-lg bg-muted px-7 py-2">
		<li class="flex items-center justify-between">
			<span class="font-mono">DB Connection</span>
			{@render status((await getDbHealth()).connected)}
		</li>
	</ul>
</div>
