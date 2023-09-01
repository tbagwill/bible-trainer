<script>
	import { VerseOfTheDay } from '$lib/components';
	import { fade, fly } from 'svelte/transition';

	export let data;

	const votd = data.verse;
	const devotional = data.devotional;
	const format = '--color-primary-500';
</script>

<div class="flex flex-col w-full mt-4 p-4 space-y-4 md:space-y-8">
	<div class="flex flex-col justify-between" in:fly={{ x: -125, delay: 100 }}>
		<h3 class="text-3xl m-4 font-bold">Daily Verse</h3>
	</div>
	<div class="flex justify-center w-full" in:fade={{ duration: 1000, delay: 100 }}>
		<VerseOfTheDay verse={votd} />
	</div>
	<h3 class="text-3xl m-4 font-bold" in:fly={{ x: -125, delay: 100 }}>Devotional</h3>
	<div class="flex flex-col w-full px-4" in:fade={{ duration: 1000, delay: 100 }}>
		{#each devotional as devotion, count}
			<h2 class="w-full font-semibold mt-4 text-xl">
				{count + 1}. {devotion.text}
			</h2>
		{/each}
	</div>
</div>
