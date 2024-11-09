<script lang="ts">
	import Feedback from '$lib/components/Feedback.svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Zoombar from '$lib/components/Zoombar.svelte';
	import Whiteboard from '$lib/integration/whiteboard';
	import { initSocket, room } from '$lib/integration/socker.io';
	import SharePanel from '../SharePanel.svelte';

	const { roomId }: { roomId?: string } = $props();

	let canvasRef: HTMLCanvasElement;
	let whiteboard: Whiteboard | null = $state(null);
	let shared: boolean = $state(false);
	let totalUser: number = $state(1);

	const socket = initSocket(roomId ?? room);

	$effect(() => {
		socket.connect();

		socket.on('connect', () => {
			console.log('user connected');
			console.log('Connected via:', socket.connected ? 'WebSocket' : 'Polling');
			console.log('Transport type:', socket.io.engine.transport.name);

			socket.on('joinUser', (total) => {
				totalUser = total;
			});
		});

		socket.on('connect_error', (error) => {
			console.error('Connection error:', error);
		});

		whiteboard = new Whiteboard(canvasRef, socket);

		return () => socket?.disconnect();
	});

	const clearCanvas = () => {
		if (whiteboard) {
			whiteboard.clearCanvas();
		}
	};

	const handleShareBoard = () => {
		shared = !shared;
	};
</script>

<div class="relative mx-auto flex items-center justify-center gap-3">
	<div class="absolute top-3 flex w-full flex-row justify-between px-3">
		<div class="flex items-center rounded bg-white p-2 shadow-md">
			<a href="/" class="text-xl font-bold">
				whiteboard
				<span class="rounded-full bg-slate-100 p-1 text-sm">dev</span>
			</a>
		</div>
		<div class="flex flex-row gap-3 bg-white p-2 shadow-md">
			<button
				class="rounded border border-red-500 bg-red-100 px-2 text-slate-800"
				onclick={clearCanvas}>Clear</button
			>
			<div class="flex w-12 flex-row">
				<div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
					{totalUser}
				</div>
			</div>
			<button
				onclick={handleShareBoard}
				class="rounded bg-teal-600 px-2 py-1 font-semibold text-white">Share board</button
			>

			{#if shared}
				<SharePanel {room} />
			{/if}
		</div>
	</div>

	<div class="absolute left-3 top-[40%]">
		{#if whiteboard}
			<Toolbar {whiteboard} />
		{/if}
	</div>

	<div class="absolute bottom-3 left-3 rounded bg-white p-2 shadow-md">
		<Feedback />
	</div>
	<div class="absolute bottom-3 right-3 rounded bg-white p-2 shadow-md">
		<Zoombar />
	</div>

	<div class="h-full w-full">
		<canvas bind:this={canvasRef} class="w-full cursor-pen rounded border border-slate-400">
		</canvas>
	</div>
</div>
