<script>
	import { page } from '$app/stores';
	import VerseSliderCard from '$lib/components/VerseSliderCard.svelte';

	const chapterContent = $page.data.chapter;
	const verses = $page.data.verses;
</script>

<div class="block w-full">
	<div class="w-full h-20">
		<div
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4"
		>
			{#each verses as verse}
				<VerseSliderCard {verse} />
			{/each}
		</div>
	</div>

	<h3 class="text-3xl mt-6 p-4">
		{chapterContent.reference}
	</h3>
	<p class="text-lg mx-6 p-4">
		{chapterContent.content}
	</p>
</div>
