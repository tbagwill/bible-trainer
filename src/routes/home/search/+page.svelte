<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let query = '';
	$: results = $page.form?.results.verses;
</script>

<div class="flex flex-col w-full p-4">
	<form action="?/search" method="POST" use:enhance>
		<input
			name="query"
			class="input p-2 pl-4"
			placeholder="Search through scripture"
			bind:value={query}
		/>
	</form>

	<div class="w-full p-2 space-y-4">
		{#if results}
			{#each results as result}
				<a href="home/scripture/{result.bookId}/{result.chapterId}/{result.id}">
					<div class="card variant-glass-secondary w-full my-4">
						<div class="w-full text-xl font-semibold p-2 ml-2">
							{result.reference}
						</div>
						<div class="w-full p-4 text-lg font-light">
							{result.text}
						</div>
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>
