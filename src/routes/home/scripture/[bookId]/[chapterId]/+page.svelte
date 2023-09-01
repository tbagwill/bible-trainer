<script>
	import { fade, fly } from 'svelte/transition';
	import { VerseSliderCard } from '$lib/components';
	import { ArrowForwardIcon, ArrowBackIcon } from '$lib/icons';

	export let data;
</script>

{#key data.chapter}
	<div class="block w-full">
		<div class="w-full flex flex-row justify-center items-center h-20 p-4">
			{#if data.chapter.previous}
				<a
					class="btn-icon-base w-8 h-8 rounded-full"
					href="/home/scripture/{data.chapter.previous.bookId}/{data.chapter.previous.id}"
				>
					<ArrowBackIcon size="32" color="rgb(var(--color-primary-500))" />
				</a>
			{/if}
			<div
				class="flex w-full snap-x scroll-px-4 snap-mandatory scroll-smooth gap-4 overflow-x-auto px-4 py-4"
			>
				{#each data.verses as verse}
					<VerseSliderCard {verse} />
				{/each}
			</div>
			{#if data.chapter.next}
				<a
					class="btn-icon-base w-8 h-8 rounded-full"
					href="/home/scripture/{data.chapter.next.bookId}/{data.chapter.next.id}"
				>
					<ArrowForwardIcon size="32" color="rgb(var(--color-primary-500))" />
				</a>
			{/if}
		</div>

		<div class="flex flex-col w-full space-y-4 p-4 pt-6">
			<h3 class="text-3xl font-bold" in:fly={{ x: -125, delay: 100 }}>
				{data.chapter.reference}
			</h3>
			<hr />
			<p class="text-lg px-4 font-medium" in:fade={{ delay: 100 }}>
				{data.chapter.content}
			</p>
		</div>
	</div>
{/key}
