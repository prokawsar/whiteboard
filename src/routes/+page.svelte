<script lang="ts">
	import Drawing from '$lib/integration/drawing';
	import socket from '$lib/integration/socker.io';

	const { data } = $props();

	let message = $state('');
	let messages = $state<string[]>([]);
	let canvasRef: HTMLCanvasElement;
	let drawing: Drawing;

	$effect(() => {
		socket.connect();

		socket.on('connect', () => {
			console.log('user connected');
			console.log('Connected via:', socket.connected ? 'WebSocket' : 'Polling');
			console.log('Transport type:', socket.io.engine.transport.name);
		});
		socket.on('message', (msg) => {
			messages.push(msg);
		});

		socket.on('connect_error', (error) => {
			console.error('Connection error:', error);
		});

		drawing = new Drawing(canvasRef);

		return () => socket?.disconnect();
	});

	const handleSubmit = () => {
		socket.emit('message', message);
		message = '';
	};

	const clearCanvas = () => {
		if (drawing) {
			drawing.clearCanvas();
		}
	};
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

<div class="mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center gap-3">
	<div class="flex flex-col items-center gap-3">
		{data.data.message}
		{#each messages as msg}
			<p class="">{msg}</p>
		{/each}
		<input bind:value={message} class="w-60 rounded-md border border-slate-300 p-2" />
		<button onclick={handleSubmit} class="rounded-md border border-slate-300 p-2">Send</button>
	</div>

	<div class="flex w-full flex-row justify-between px-5">
		<p class="font-bold">Canvas</p>
		<button class="rounded border border-red-500 px-2" onclick={clearCanvas}>Clear</button>
	</div>

	<div class="p-5">
		<canvas bind:this={canvasRef} class="rounded border border-slate-400"></canvas>
	</div>
</div>
