<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import Icon from '@iconify/svelte';
</script>

<Head />

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
			class="flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-lg text-white shadow-lg transition hover:bg-teal-600"
		>
			Start Whiteboard
			<Icon icon="mdi:arrow-right" />
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
		@apply pointer-events-none absolute flex h-full w-full items-center justify-center overflow-hidden;
		z-index: -1;
	}

	.shadow-circle {
		@apply absolute rounded-full;
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
