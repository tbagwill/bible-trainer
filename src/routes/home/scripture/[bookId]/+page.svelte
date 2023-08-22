<script>
	import { page } from "$app/stores";
    import BibleChapterInfoCard from "$lib/components/BibleChapterInfoCard.svelte";

    const chapters = $page.data.chapters
</script>

<div class="flex flex-col items-center w-full p-4">
    <div class="grid grid-cols-5 gap-4 w-full">
        {#each chapters as chapter}
            <div class="flex w-full justify-center">
                <a class="w-full" href="/home/scripture/{chapter.bookId}/{chapter.id}">
                    <BibleChapterInfoCard chapter={chapter}/>
                </a>
            </div>
        {/each}
    </div>
</div>