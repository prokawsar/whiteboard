<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import WhiteboardUi from '$lib/components/whiteboard/WhiteboardUI.svelte';
	import { getOrCreateUUID } from '$lib/utils/tools';

	let uuid = '';

	const createWhiteboard = async () => {
		uuid = getOrCreateUUID();

		return await fetch('/api/board/createBoard', {
			method: 'post',
			body: JSON.stringify({ uuid }),
			headers: {
				'content-type': 'application/json'
			}
		});
	};
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

{#await createWhiteboard()}
	<Loader />
{:then _}
	<WhiteboardUi roomId={uuid} />
{/await}
