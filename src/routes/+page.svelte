<script lang="ts">
	import Features from '$lib/components/landing/Features.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Whiteboard</title>
</svelte:head>

<div class="mx-auto flex h-screen w-full max-w-7xl flex-col items-center gap-3">
	<header class="mt-10 text-center">
		<h1 class="text-4xl font-bold text-gray-800">
			Collaborate in Real Time on a Shared Whiteboard
		</h1>
		<p class="mt-2 text-lg text-gray-600">
			Create, share, and brainstorm effortlessly with our interactive whiteboard.
		</p>
	</header>

	<Features />

	<div class="flex flex-col items-center gap-3">
		<a
			href="/whiteboard"
			class="rounded-full bg-teal-500 px-6 py-3 text-lg text-white shadow-lg transition hover:bg-teal-600"
		>
			Start Whiteboard
		</a>
	</div>

	<div class="background-shadows">
		<div class="shadow-circle left-1 top-1 h-60 w-60"></div>
		<div class="shadow-circle left-2/4 top-[50%] h-[500px] w-[500px]"></div>
		<div class="shadow-circle left-[70%] top-[80%] h-72 w-72"></div>
	</div>

	<Footer />
</div>

<style>
	.background-shadows {
		position: absolute;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: -1;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.shadow-circle {
		position: absolute;
		border-radius: 100%;
		background: radial-gradient(
			circle,
			rgba(0, 128, 128, 0.1),
			rgba(56, 170, 170, 0.2),
			transparent
		);
		box-shadow:
			0px 0px 100px rgba(0, 128, 128, 0.1),
			0px 0px 200px rgba(56, 178, 172, 0.5);
	}
</style>
