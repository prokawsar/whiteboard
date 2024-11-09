<script lang="ts">
	import Icon from '@iconify/svelte';
	import ColorSelector from './ColorSelector.svelte';
	import type Whiteboard from '$lib/integration/whiteboard';

	let { whiteboard }: { whiteboard: Whiteboard } = $props();

	let activeTool = $state('');
	let showPanel = $state(false);

	const handleActiveTool = (toolName: string) => {
		activeTool = toolName;
		showPanel = !showPanel;
	};
</script>

<div class="relative flex w-12 flex-col items-center gap-1 rounded bg-white p-1 shadow-md">
	<button class="">
		<Icon icon="mingcute:cursor-fill" width="28px" />
	</button>
	<button class:active={activeTool == 'pen'} onclick={() => handleActiveTool('pen')}>
		<Icon icon="mingcute:pen-fill" width="28px" />
	</button>
	<button class="">
		<Icon icon="arcticons:notes" width="25px" stroke-width="4px" />
	</button>
	<button>
		<Icon icon="mingcute:font-line" width="28px" />
	</button>

	{#if showPanel && activeTool == 'pen'}
		<div
			class="absolute left-14 top-10 flex w-12 flex-col items-center gap-1 rounded bg-white p-1 drop-shadow-lg"
		>
			<div class="relative flex items-center py-1">
				<ColorSelector
					selectedColor={whiteboard.getStrokeColor()}
					onChangePen={({ color, thickness }) => {
						whiteboard.setLineWidth(thickness);
						whiteboard.setStrokeColor(color);
					}}
				/>
			</div>
		</div>
	{/if}
</div>

<style>
	button {
		@apply flex h-9 w-9 items-center justify-center rounded hover:bg-teal-50;
		&.active {
			@apply bg-teal-100 text-teal-800;
		}
	}
</style>
