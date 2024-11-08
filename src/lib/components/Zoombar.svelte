<script lang="ts">
	import Icon from '@iconify/svelte';
	let zoom = $state(100);
</script>

<div class="flex flex-row items-center gap-3">
	<button onclick={() => (zoom -= 10)} class="">
		<Icon icon="mdi:minus" width="20px" />
	</button>
	<p class="font-semibold">{zoom}%</p>
	<button onclick={() => (zoom += 10)} class="">
		<Icon icon="mdi:plus" width="20px" />
	</button>
</div>

<style>
	button {
		@apply flex h-9 w-9 items-center justify-center rounded-md p-1 hover:bg-slate-100;
	}
</style>
