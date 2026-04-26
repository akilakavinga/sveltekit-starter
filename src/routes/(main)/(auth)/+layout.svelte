<script lang="ts">
	let { children } = $props();
</script>

<div class="min-h-svh border-2 border-red-500">
	{@render children()}
</div>
