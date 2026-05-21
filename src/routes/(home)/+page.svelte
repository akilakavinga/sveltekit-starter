<script lang="ts">
	import { getDbHealth } from '$lib/modules/rpc/health.remote';
</script>

{#snippet status(bool: boolean)}
	<div class={['aspect-square w-2 rounded-full', bool ? 'bg-green-500' : 'bg-red-500']}></div>
{/snippet}

<div class="h-full flex items-center justify-center">
	<ul class="w-75 rounded-lg bg-muted px-7 py-2">
		<li class="flex items-center justify-between">
			<span class="font-mono">DB Connection</span>
			{@render status((await getDbHealth()).connected)}
		</li>
	</ul>
</div>
