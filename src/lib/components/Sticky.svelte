<script lang="ts">
	const stickyColors = [
		'#29b6f6',
		'#66bb6a',
		'#9ccc65',
		// '#d4e157',
		'#ffee58',
		// '#ffca28',
		'#ffa726',
		'#ff7043'
	];
</script>

<div class="flex flex-col gap-2">
	{#each stickyColors as color}
		<button aria-label="bg" class="h-16 w-20" style={`background-color:${color}`}> </button>
	{/each}
</div>
