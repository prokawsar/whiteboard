<script lang="ts">
	import Drawing from '$lib/integration/drawing';
	import socket from '$lib/integration/socker.io';

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

		drawing = new Drawing(canvasRef, socket);

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

<div class="relative mx-auto flex items-center justify-center gap-3">
	<div class="absolute top-2 flex w-full flex-row justify-between px-5">
		<p class="font-bold">Canvas</p>
		<button class="rounded border border-red-500 px-2" onclick={clearCanvas}>Clear</button>
	</div>

	<div class="h-full w-full">
		<canvas bind:this={canvasRef} class="w-full rounded border border-slate-400"></canvas>
	</div>
</div>
