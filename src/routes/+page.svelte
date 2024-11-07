<script lang="ts">
	const { data } = $props();
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center">
	<div class="flex flex-col items-center gap-3">
		{data.data.message}
		<input class="border border-slate-300 rounded-md p-2 w-60" />
		<button class="border rounded-md border-slate-300 p-2">Send</button>
	</div>
</div>
