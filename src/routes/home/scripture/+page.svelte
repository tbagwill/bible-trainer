<script>
	import { fade, fly } from 'svelte/transition';
	import { BibleBookInfoCard } from '$lib/components';

	export let data;
</script>

<div class="flex flex-col items-center w-full p-4 space-y-4">
	<div class="flex flex-col w-full space-y-4" in:fly={{ x: -125, delay: 100 }}>
		<h3 class="w-full text-3xl font-bold">Books</h3>
		<hr class="w-full bg-surface-700" />
	</div>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full" in:fade={{ delay: 100 }}>
		{#each data.books as book}
			<div class="flex w-full justify-center hover:bg-primary-500 rounded-xl book-box">
				<a class="w-full" href="/home/scripture/{book.id}">
					<BibleBookInfoCard {book} />
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.book-box:hover {
		transform: scale(1.05);
	}
</style>
