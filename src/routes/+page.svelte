<script lang="ts">
	const { data } = $props();
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

<div class="mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center gap-3">
	<div class="flex flex-col items-center gap-3">
		<a
			href="/whiteboard"
			class="rounded border border-slate-400 px-3 py-1 text-lg hover:bg-slate-100"
		>
			Start whiteboard
		</a>
	</div>
</div>
