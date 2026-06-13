<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { CircleCheck, CircleX, Copy, CopyCheck, Database, Moon, Sun } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { mode, toggleMode } from 'mode-watcher';

	type Toast = {
		id: string;
		message: string;
		type: 'success' | 'error';
	};

	const VERSION = '0.1';

	const toast = (() => {
		let _toasts: Toast[] = $state.raw([]);

		function toast(message: string, type: 'success' | 'error') {
			const id = crypto.randomUUID();
			_toasts = [
				..._toasts,
				{
					id,
					type,
					message
				}
			];
			setTimeout(() => {
				_toasts = _toasts.filter((t) => t.id != id);
			}, 3000);
		}

		return {
			get items() {
				return _toasts;
			},
			success: (msg: string) => toast(msg, 'success'),
			error: (msg: string) => toast(msg, 'error')
		};
	})();

	let hasCopied = $state(false);

	const handleCopy = async () => {
		if (hasCopied) return;
		try {
			await navigator.clipboard.writeText('pnpm db:generate; pnpm db:migrate;');
			toast.success('SUCCESS: COPIED TO CLIPBOARD');
			hasCopied = true;
			setTimeout(() => {
				hasCopied = false;
			}, 2000);
		} catch {
			toast.error('ERROR: COPYING TO CLIPBOARD');
		}
	};
</script>

{#snippet tileBG()}
	<div class="tile-bg"></div>
{/snippet}

{#snippet themeToggle()}
	<Tooltip.Root>
		<Tooltip.Trigger
			onclick={toggleMode}
			class={['text-muted-foreground', buttonVariants({ variant: 'ghost', size: 'icon-sm' })]}
		>
			{#if mode.current === 'dark'}
				<Moon class="size-5" />
			{:else}
				<Sun class="size-5" />
			{/if}
		</Tooltip.Trigger>

		<Tooltip.Content class="custom-tooltip">Change Theme</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

{#snippet toaster()}
	<ul class="absolute right-5 bottom-5 flex flex-col gap-2 overflow-clip text-justify">
		{#each toast.items as t (t.id)}
			<li
				in:fly={{ y: 100 }}
				out:fly={{ x: 100 }}
				class="flex w-87.5 items-center gap-4 border border-primary bg-border py-4 pr-3 pl-5 font-heading text-sm tracking-wider dark:bg-accent"
			>
				{#if t.type === 'success'}
					<CircleCheck class="size-5" />
				{:else}
					<CircleX class="size-5" />
				{/if}
				{t.message}
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet content()}
	<section class="flex flex-1 flex-col items-center justify-center">
		<div class="flex items-center gap-4">
			<div class="h-2 w-2 bg-primary"></div>
			<span class="font-heading text-sm tracking-widest">SYSTEM INITIALIZED</span>
			<div class="h-2 w-2 bg-primary"></div>
		</div>

		<h1 class="mt-4 mb-10 font-heading text-5xl font-bold">Welcome to SvelteKit</h1>
		<p class="mx-auto max-w-xl text-center font-light">
			Everything you need to build Svelte apps, powered by Vite. Experience the next generation of
			web development with high-density components and a rigid baseline grid.
		</p>

		<fieldset class="mt-8 w-100 border border-primary px-2 pb-2">
			<legend class="px-2 font-heading text-xs text-muted-foreground">
				<Database class="inline size-3" /> DATABASE
			</legend>
			<div class="flex items-center justify-between bg-muted py-1 pr-2 pl-4">
				<ul class="font-heading">
					<li class="text-sm"><span class="mr-4 text-muted-foreground">$</span>pnpm db:generate</li>
					<li class="text-sm"><span class="mr-4 text-muted-foreground">$</span>pnpm db:migrate</li>
				</ul>
				<Tooltip.Root>
					<Tooltip.Trigger
						disabled={hasCopied}
						onclick={handleCopy}
						class={buttonVariants({ variant: 'ghost', size: 'icon-lg' })}
					>
						{#if hasCopied}
							<CopyCheck />
						{:else}
							<Copy />
						{/if}
					</Tooltip.Trigger>
					<Tooltip.Content class="custom-tooltip">Copy</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</fieldset>
	</section>
{/snippet}

{@render tileBG()}
{@render toaster()}

<Tooltip.Provider delayDuration={600}>
	<main class="flex h-full flex-col">
		<header class="flex h-16 w-full items-center border-b border-foreground bg-muted px-16">
			<h1 class="inline font-heading text-2xl font-bold">SvelteKit Starter</h1>
			<span class="ml-3 bg-foreground px-1 font-heading text-xs text-background">v{VERSION}</span>
			<div class="flex flex-1 items-center justify-end gap-10">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<a
							target="_blank"
							class="font-heading text-muted-foreground transition-colors hover:text-foreground"
							href="https://github.com/akilakavinga/sveltekit-starter">GitHub</a
						>
					</Tooltip.Trigger>
					<Tooltip.Content>Go to GitHub</Tooltip.Content>
				</Tooltip.Root>
				{@render themeToggle()}
			</div>
		</header>
		{@render content()}
		<footer
			class="flex h-16 w-full items-center justify-start gap-3 border-t border-foreground bg-muted px-16"
		>
			<p class="font-heading text-xs">
				&COPY; 2026. Project by <a
					class="hover:underline"
					target="_blank"
					href="https://github.com/akilakavinga">Akila Kavinga</a
				>
			</p>
		</footer>
	</main>
</Tooltip.Provider>

<style>
	.tile-bg {
		--cell-size: 1px;
		--bg-size: 22px;
		position: absolute;
		inset: 0;
		z-index: -100;
		background-color: var(--color-background);

		background-image:
			linear-gradient(to right, var(--color-muted) var(--cell-size), transparent var(--cell-size)),
			linear-gradient(to bottom, var(--color-muted) var(--cell-size), transparent var(--cell-size));

		background-size: var(--bg-size) var(--bg-size);
	}

	:global(.custom-tooltip) {
		font-family: var(--font-heading);
		letter-spacing: 0.5px;
	}
</style>
