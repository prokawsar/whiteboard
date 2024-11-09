<script lang="ts">
	import { colors } from '$lib/utils/contstants';

	type PenProps = {
		selectedColor: string;
		onChangePen: ({ color, thickness }: { color: string; thickness: number }) => void;
	};

	let { selectedColor = '#000', onChangePen }: PenProps = $props();

	let openColors = $state(false);
	let thickness = $state(3);
	let bgColors = colors.map((i) => i.bg);

	const selectColor = (index: number) => {
		if (!colors[index]) {
			openColors = false;
			return;
		}
		selectedColor = colors[index].bg;
		openColors = false;
		handleUpdatePen();
	};

	const handleUpdatePen = () => {
		onChangePen({ color: selectedColor, thickness });
	};
</script>

<button
	aria-label="color"
	onclick={() => (openColors = !openColors)}
	class="h-6 w-6 rounded"
	style={`background-color:${selectedColor}`}
></button>
{#if openColors}
	<div
		class="absolute left-11 top-0 flex w-56 flex-col items-center gap-3 rounded bg-white p-2 drop-shadow-lg"
	>
		<div class="flex w-full flex-col">
			<input
				onchange={handleUpdatePen}
				bind:value={thickness}
				type="range"
				min="1"
				max="20"
				step="0.5"
			/>
			<p class="text-sm">Thickness</p>
		</div>
		<div class="flex flex-row flex-wrap items-center gap-2">
			{#each bgColors as color, index}
				<button
					aria-label="color"
					onclick={() => selectColor(index)}
					class="h-7 w-7 cursor-pointer rounded"
					style="background-color:{color};"
				></button>
			{/each}
		</div>
	</div>
{/if}
