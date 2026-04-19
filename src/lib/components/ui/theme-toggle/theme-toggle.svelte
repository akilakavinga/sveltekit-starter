<script lang="ts">
 import {HugeiconsIcon} from "@hugeicons/svelte"
 import {Sun, Moon02Icon as Moon} from "@hugeicons/core-free-icons";

 import { resetMode, setMode } from "mode-watcher";
 import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
 import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";
</script>

<DropdownMenu.Root>
 <DropdownMenu.Trigger
  class={cn(buttonVariants({ variant: "outline", size: "icon" }), "absolute top-4 right-4")}
 >
   <HugeiconsIcon icon={Sun} class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90" />
   <HugeiconsIcon icon={Moon} class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0" />
  <span class="sr-only">Toggle theme</span>
 </DropdownMenu.Trigger>
 <DropdownMenu.Content align="end">
  <DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item
  >
  <DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
  <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
 </DropdownMenu.Content>
</DropdownMenu.Root>
