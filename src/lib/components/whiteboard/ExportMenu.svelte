<script lang="ts">
	import Icon from '@iconify/svelte';
	import jsPDF from 'jspdf';

	const { canvasRef }: { canvasRef: HTMLCanvasElement } = $props();

	let showExportMenu: boolean = $state(false);

	const exportAsImage = (format: 'png' | 'jpeg' = 'png') => {
		if (!canvasRef) throw Error('No canvas ref found');

		const dataURL = canvasRef.toDataURL(`image/${format}`);
		const link = document.createElement('a');

		link.href = dataURL;
		link.download = `whiteboard_${new Date().toLocaleTimeString()}.${format}`;
		link.click();
		toggleMenu();
	};

	const exportAsPDF = () => {
		if (!canvasRef) throw Error('No canvas ref found');
		const { width, height } = canvasRef;
		const pdf = new jsPDF('landscape', 'px', [width, height]);
		const dataURL = canvasRef.toDataURL('image/png');

		pdf.addImage(dataURL, 'PNG', 0, 0, width, height);
		pdf.save(`whiteboard_${new Date().toLocaleTimeString()}.pdf`);
		toggleMenu();
	};

	const toggleMenu = () => {
		showExportMenu = !showExportMenu;
	};
</script>

<button class="rounded hover:!bg-slate-100" onclick={toggleMenu}>
	<Icon icon="bx:export" class="w-full" width="22px" />
</button>

{#if showExportMenu}
	<div class="absolute right-0 top-14 flex flex-col items-center rounded bg-white p-1 shadow-md">
		<button onclick={() => exportAsImage('jpeg')}> Save as JPEG </button>
		<button onclick={() => exportAsImage('png')}> Save as PNG </button>
		<button onclick={exportAsPDF}> Save as PDF </button>
	</div>
{/if}

<style>
	button {
		@apply w-full p-1 px-2 text-slate-600 hover:bg-slate-100;
	}
</style>
