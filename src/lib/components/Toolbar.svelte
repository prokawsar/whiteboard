<script lang="ts">
	import Icon from '@iconify/svelte';
	import ColorSelector from './ColorSelector.svelte';
	import type Whiteboard from '$lib/integration/whiteboard.svelte.ts';
	import Sticky from './Sticky.svelte';

	let { whiteboard }: { whiteboard: Whiteboard } = $props();

	let activeTool = $state(whiteboard.activeTool);
	let showPanel = $state(false);

	const hasPanel = ['pen', 'sticky'];

	const handleActiveTool = (toolName: string) => {
		if (hasPanel.includes(toolName)) {
			showPanel = !showPanel;
		}
		activeTool = toolName;
		whiteboard.setActiveTool(toolName);
	};

	const undo = () => {
		whiteboard.undo();
	};

	const redo = () => {
		whiteboard.redo();
	};
</script>

<div class="relative flex w-12 flex-col items-center gap-1 rounded bg-white p-1 shadow-md">
	<button class="">
		<Icon icon="mingcute:cursor-fill" width="28px" />
	</button>
	<button class:active={activeTool == 'pen'} onclick={() => handleActiveTool('pen')}>
		<Icon icon="mingcute:pen-fill" width="28px" />
	</button>
	<button class:active={activeTool == 'sticky'} onclick={() => handleActiveTool('sticky')}>
		<Icon icon="arcticons:notes" width="25px" stroke-width="4px" />
	</button>
	<button class:active={activeTool == 'text'} onclick={() => handleActiveTool('text')}>
		<Icon icon="mingcute:font-line" width="28px" />
	</button>

	<span class="h-[1px] w-full bg-gray-300"></span>

	<button onclick={undo} disabled={whiteboard.historyIndex === -1}>
		<Icon icon="lucide:undo" width="28px" />
	</button>
	<button
		onclick={redo}
		disabled={!whiteboard.history.length ||
			whiteboard.history.length - 1 === whiteboard.historyIndex}
	>
		<Icon icon="lucide:redo" width="28px" />
	</button>

	{#if showPanel && hasPanel.includes(activeTool)}
		<div
			class:top-10={activeTool == 'pen'}
			class="absolute left-14 flex min-w-12 flex-col items-center gap-1 rounded bg-white p-1 drop-shadow-lg"
		>
			<div class="relative flex items-center py-1">
				{#if activeTool == 'pen'}
					<ColorSelector
						selectedColor={whiteboard.getStrokeColor()}
						onChangePen={({ color, thickness }) => {
							whiteboard.setLineWidth(thickness);
							whiteboard.setStrokeColor(color);
						}}
					/>
				{/if}

				{#if activeTool == 'sticky'}
					<Sticky />
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	button {
		@apply flex h-9 w-9 items-center justify-center rounded hover:border hover:border-teal-700 hover:bg-teal-50 disabled:border-none disabled:text-gray-400;
		&.active {
			@apply border border-teal-700 bg-teal-100 text-teal-800;
		}
	}
</style>
