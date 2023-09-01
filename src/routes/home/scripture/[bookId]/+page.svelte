<script>
	import { fade, fly } from 'svelte/transition';
	import BibleChapterInfoCard from '$lib/components/BibleChapterInfoCard.svelte';

	export let data;
</script>

<div class="flex flex-col items-center w-full p-4 space-y-4">
	<div class="flex flex-col w-full space-y-4" in:fly={{ x: -125, delay: 100 }}>
		<h3 class="w-full text-3xl font-bold">Chapters</h3>
		<hr class="w-full bg-surface-700" />
	</div>
	<div class="grid grid-cols-3 md:grid-cols-5 gap-4 w-full" in:fade={{ delay: 100 }}>
		{#each data.chapters as chapter}
			<div class="flex w-full justify-center hover:bg-primary-500 rounded-xl chapter-box">
				<a class="w-full" href="/home/scripture/{chapter.bookId}/{chapter.id}">
					<BibleChapterInfoCard {chapter} />
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.chapter-box:hover {
		transform: scale(1.05);
	}
</style>
