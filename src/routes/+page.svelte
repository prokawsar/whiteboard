<script lang="ts">
	import socket from '$lib/integration/socker.io';

	const { data } = $props();

	let message = $state('');
	let messages = $state<string[]>([]);

	$effect(() => {
		socket.connect();

		socket.on('connect', () => {
			console.log('user connected');
		});
		socket.on('message', (msg) => {
			messages.push(msg);
		});

		return () => socket?.disconnect();
	});

	const handleSubmit = () => {
		socket.emit('message', message);
		message = '';
	};
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center">
	<div class="flex flex-col items-center gap-3">
		{data.data.message}
		{#each messages as msg}
			<p class="">{msg}</p>
		{/each}
		<input bind:value={message} class="border border-slate-300 rounded-md p-2 w-60" />
		<button onclick={handleSubmit} class="border rounded-md border-slate-300 p-2">Send</button>
	</div>
</div>
