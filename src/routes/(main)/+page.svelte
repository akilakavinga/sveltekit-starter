<script lang='ts'>
	import { getDbHealth } from "./index.remote";

</script>

{#snippet status(bool: boolean)}
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <div
    class={[
      "w-2 rounded-full aspect-square",
      bool ? "bg-green-500" : "bg-red-500",
    ]}
  />
{/snippet}

<div class="border-2 border-red-500/30 min-h-svh grid place-items-center">
  <ul class="w-75 bg-muted px-7 py-2 rounded-lg">
    <li class="flex justify-between items-center">
      <span class="font-mono">DB Connection</span>
      {@render status((await getDbHealth()).connected)}
    </li>
  </ul>
</div>
