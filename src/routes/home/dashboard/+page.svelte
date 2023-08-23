<script>
	import { page } from "$app/stores";
	import VerseOfTheDay from "$lib/components/VerseOfTheDay.svelte";

    const votd = $page.data.verse
</script>

<div class="flex flex-col w-full mt-4 p-4">
    <div class="flex justify-center w-full">
        <VerseOfTheDay verse={votd} />
    </div>
</div>