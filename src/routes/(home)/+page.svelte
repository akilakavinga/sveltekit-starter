<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import {
		CircleCheck,
		CircleX,
		Copy,
		CopyCheck,
		Database,
		ExternalLink,
		Menu,
		Moon,
		Sun
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Dropdown from '$lib/components/ui/dropdown-menu';
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
				class="flex w-60 items-center gap-3 border border-primary bg-border py-2.5 pr-1 pl-4 font-heading text-[0.66rem] xs:tracking-wider sm:w-87.5 sm:gap-4 sm:py-4 sm:pr-3 sm:pl-5 sm:text-sm dark:bg-accent"
			>
				{#if t.type === 'success'}
					<CircleCheck class="size-3.5 sm:size-5" />
				{:else}
					<CircleX class="size-3.5 sm:size-5" />
				{/if}
				{t.message}
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet content()}
	<section class="mx-5 flex flex-1 flex-col items-center justify-center">
		<div class="flex items-center gap-3 xs:gap-4">
			<div class="aspect-square h-1.5 bg-primary xs:h-2"></div>
			<span class="font-heading text-[.65rem] tracking-widest xs:text-xs sm:text-sm"
				>SYSTEM INITIALIZED</span
			>
			<div class="aspect-square h-1.5 bg-primary xs:h-2"></div>
		</div>

		<h1
			class="mt-1 mb-4 font-heading text-2xl font-bold whitespace-nowrap xs:mt-3 xs:mb-7 xs:text-4xl sm:mt-4 sm:mb-10 sm:text-5xl"
		>
			Welcome to SvelteKit
		</h1>
		<p class="text-center text-[0.6rem] font-light xs:text-sm sm:max-w-xl sm:text-base">
			Everything you need to build Svelte apps, powered by Vite. Experience the next generation of
			web development with high-density components and a rigid baseline grid.
		</p>

		<fieldset class="mt-8 w-full border border-primary px-2 pb-2 xs:w-100">
			<legend class="px-2 font-heading text-[.55rem] text-muted-foreground xs:text-xs">
				<Database class="inline size-2 xs:size-3" /> DATABASE
			</legend>
			<div class="flex items-center justify-between bg-muted py-0.5 pr-3 pl-2 xs:py-1 xs:pl-4">
				<ul class="font-heading">
					<li class="text-[.65rem] xs:text-sm">
						<span class="mr-3 text-muted-foreground xs:mr-4">$</span>pnpm db:generate
					</li>
					<li class="text-[.65rem] xs:text-sm">
						<span class="mr-3 text-muted-foreground xs:mr-4">$</span>pnpm db:migrate
					</li>
				</ul>
				<Tooltip.Root>
					<Tooltip.Trigger disabled={hasCopied} onclick={handleCopy} class="">
						{#if !hasCopied}
							<Copy class="xs:size-4.5 size-3.5" />
						{:else}
							<CopyCheck class="xs:size-4.5 size-3.5" />
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
		<header
			class="flex h-12 w-full items-center border-b border-foreground bg-muted px-7 xs:h-16 md:px-16"
		>
			<h1 class="inline font-heading text-sm font-bold whitespace-nowrap xs:text-xl">
				SvelteKit Starter
			</h1>
			<span
				class="ml-2 bg-foreground px-1 font-heading text-[0.55rem] text-background xs:ml-3 xs:text-xs"
				>v{VERSION}</span
			>
			<!-- Larger Screens -->
			<div class="flex flex-1 items-center justify-end gap-5 max-xs:hidden md:gap-7">
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

			<!-- Small Mobile Screens -->
			<div class="hidden flex-1 items-center justify-end max-xs:flex">
				<Dropdown.Root>
					<Dropdown.Trigger>
						<Menu class="size-4.5" />
					</Dropdown.Trigger>
					<Dropdown.Content
						align="end"
						class="border border-primary bg-accent text-foreground shadow-none"
					>
						<Dropdown.Item onclick={toggleMode} class="w-full gap-4">
							{#if mode.current === 'dark'}
								<Moon />
							{:else}
								<Sun />
							{/if}
							<span class="font-heading text-xs">Appearance</span>
						</Dropdown.Item>
						<a href="https://github.com/akilakavinga/sveltekit-starter" target="_blank">
							<Dropdown.Item class="w-full gap-4">
								<ExternalLink />
								<span class="font-heading text-xs">Github</span>
							</Dropdown.Item>
						</a>
					</Dropdown.Content>
				</Dropdown.Root>
			</div>

		</header>
		{@render content()}
		<footer
			class="flex h-12 w-full items-center justify-start gap-3 border-t border-foreground bg-muted px-7 xs:h-16 md:px-16"
		>
			<p class="font-heading text-[.60rem] max-xs:tracking-tighter xs:text-xs">
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
