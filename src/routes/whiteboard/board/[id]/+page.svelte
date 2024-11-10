<script lang="ts">
	import { page } from '$app/stores';
	import WhiteboardUi from '$lib/components/whiteboard/WhiteboardUI.svelte';
	const { data: boardPromise } = $props();

	const room = $page.params.id;
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

{#await boardPromise}
	<p>Loading...</p>
{:then data}
	<WhiteboardUi roomId={room} />
{/await}
