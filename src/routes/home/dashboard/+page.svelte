<script>
	import VerseOfTheDay from '$lib/components/VerseOfTheDay.svelte';

	export let data;

	const votd = data.verse;
</script>

<div class="flex flex-col w-full mt-4 p-4 space-y-4 md:space-y-8">
	<div class="flex flex-col md:flex-row items-end justify-between">
		<h3 class="text-3xl m-4 font-bold">Daily Verse</h3>
	</div>
	<div class="flex justify-center w-full">
		<VerseOfTheDay verse={votd} />
	</div>
	<h3 class="text-3xl m-4 font-bold">Activities</h3>
</div>
