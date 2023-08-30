<script>
	import { memoryVerses } from '$lib/data/memory';
</script>

<div class="flex flex-col w-full p-4">
	<div class="card variant-ringed-primary text-xl font-bold p-4 mb-8">
		{memoryVerses[0].question}
	</div>
	<div class="flex flex-col justify-center items-center space-y-4">
		{#each memoryVerses[0].answers as answer}
			<button class="btn variant-filled-primary rounded-lg w-11/12 md:w-3/4 text-lg font-semibold">
				<h3 class="whitespace-pre-wrap">
					{answer.response}
				</h3>
			</button>
		{/each}
	</div>
</div>
