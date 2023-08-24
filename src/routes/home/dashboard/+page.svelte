<script>
	import { page } from "$app/stores";
	import VerseOfTheDay from "$lib/components/VerseOfTheDay.svelte";

    const votd = $page.data.verse
    console.log( votd )
</script>

<div class="flex flex-col w-full mt-4 p-4 space-y-4">
    <h3 class="text-3xl mx-4 mb-4 font-bold">
        Daily Verse
    </h3>
    <div class="flex justify-center w-full">
        <VerseOfTheDay verse={votd} />
    </div>
    <h3 class="text-3xl mx-4 mb-8 font-bold">
        Activities
    </h3>
</div>