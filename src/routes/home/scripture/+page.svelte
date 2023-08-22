<script>
	import { page } from "$app/stores";
	import BibleBookInfoCard from "$lib/components/BibleBookInfoCard.svelte";

    const books = $page.data.books
</script>



<div class="flex flex-col items-center w-full p-4">
    <div class="grid grid-cols-4 gap-4 w-full">
        {#each books as book}
        <div class="flex w-full justify-center">
            <a class="w-full" href="/home/scripture/{book.id}">
                <BibleBookInfoCard book={book}/>
            </a>
        </div>
        {/each}
    </div>
</div>
