<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	const { room } = $props();

	let shareUrl: string = $state('');

	$effect(() => {
		if (!shareUrl) {
			shareUrl = $page.url.host + '/whiteboard/board/' + room;
		}
	});

	const copyUrl = () => {
		navigator.clipboard.writeText(shareUrl);
	};
</script>

<div class="absolute right-3 top-14 flex w-80 flex-col gap-2 rounded bg-white p-2 py-3 shadow-md">
	<p class="text-center text-xl font-semibold text-teal-900">
		Share your board and collaborate real-time.
	</p>
	<div class="flex w-full flex-row items-center gap-3">
		<input value={shareUrl} class="w-[90%] rounded border border-teal-600 p-1 px-2 text-gray-700" />
		<button
			onclick={copyUrl}
			class="flex items-center justify-center rounded bg-slate-100 p-2 hover:bg-slate-200"
		>
			<Icon icon="solar:copy-outline" />
		</button>
	</div>
</div>
