<script>
	import { page } from '$app/stores';
	import BibleChapterInfoCard from '$lib/components/BibleChapterInfoCard.svelte';

	const chapters = $page.data.chapters;
</script>

<div class="flex flex-col items-center w-full p-4 space-y-4">
	<h3 class="w-full text-3xl font-bold">Chapters</h3>
	<hr class="w-full bg-surface-700" />
	<div class="grid grid-cols-3 md:grid-cols-5 gap-4 w-full">
		{#each chapters as chapter}
			<div class="flex w-full justify-center">
				<a class="w-full" href="/home/scripture/{chapter.bookId}/{chapter.id}">
					<BibleChapterInfoCard {chapter} />
				</a>
			</div>
		{/each}
	</div>
</div>
