<script>
	import { goto } from "$app/navigation";
	import { getVerseReference } from "$lib/data/utils";

    export let verse;
</script>

<div class="snap-start shrink-0 variant-glass-secondary w-12 md:w-16 h-12 md:h-16 text-xl text-on-secondary-token text-center rounded-xl">
    <div class="btn w-full h-full flex flex-col justify-center" on:click={ goto(`${verse.chapterId}/${verse.id}`)}>
        { getVerseReference( verse.id ) }
    </div>
</div>