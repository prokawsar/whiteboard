<script lang="ts">
	import '$lib/styles/app.css';
	import { page } from '$app/stores';
</script>

<div class="flex h-screen w-full flex-col items-center justify-center">
	<p class="text-xl text-red-600">
		{$page.error?.message}
	</p>
	<a href="/">Back to home</a>
</div>
