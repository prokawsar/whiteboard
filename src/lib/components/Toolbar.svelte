<script lang="ts">
	import Icon from '@iconify/svelte';

	let activeTool = $state('');
</script>

<div class="flex w-12 flex-col items-center gap-1 rounded bg-white p-1 shadow-md">
	<button class="">
		<Icon icon="mingcute:cursor-fill" width="28px" />
	</button>
	<button class="active">
		<Icon icon="mingcute:pen-fill" width="28px" />
	</button>
	<button class="">
		<Icon icon="arcticons:notes" width="25px" stroke-width="4px" />
	</button>
	<button>
		<Icon icon="mingcute:font-line" width="28px" />
	</button>
</div>

<style>
	button {
		@apply flex h-9 w-9 items-center justify-center rounded hover:bg-teal-50;
		&.active {
			@apply bg-teal-100 text-teal-800;
		}
	}
</style>
