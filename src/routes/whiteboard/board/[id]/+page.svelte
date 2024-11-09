<script lang="ts">
	import { page } from '$app/stores';
	import WhiteboardUi from '$lib/components/whiteboard/WhiteboardUI.svelte';

	const room = $page.params.id;
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

<WhiteboardUi roomId={room} />
