<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<section class="mt-10 grid gap-3 md:grid-cols-3">
	<div class="flex flex-col items-center p-4">
		<Icon icon="mdi:account-group" class="h-16 w-16 text-blue-500" />
		<h2 class="mt-2 text-xl font-semibold">Real-Time Collaboration</h2>
		<p class="text-center text-gray-600">
			Connect with your team and collaborate in real time on an interactive canvas.
		</p>
	</div>
	<div class="flex flex-col items-center p-4">
		<Icon icon="mdi:brush" class="h-16 w-16 text-green-500" />
		<h2 class="mt-2 text-xl font-semibold">Intuitive Drawing Tools</h2>
		<p class="text-center text-gray-600">
			Freehand, shapes, text, and more—designed for easy and precise interaction.
		</p>
	</div>
	<div class="flex flex-col items-center p-4">
		<Icon icon="mdi:content-save" class="h-16 w-16 text-slate-600" />
		<h2 class="mt-2 text-xl font-semibold">
			Save and Restore Boards <span
				class="rounded-full border border-slate-400 px-2 text-sm font-normal">Upcoming</span
			>
		</h2>
		<p class="text-center text-gray-600">
			Save whiteboard states and restore them anytime, from any device.
		</p>
	</div>
</section>
