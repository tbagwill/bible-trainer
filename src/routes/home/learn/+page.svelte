<script>
	import { fade, fly } from 'svelte/transition';
	const learningRoutes = [
		{
			name: 'Memory Verses',
			description:
				"Sharpen your memory and build your recollection of God's word by using our Memory Verses game!",
			linkRef: 'memory'
		},
		{
			name: 'Bible Trivia',
			description:
				'Learn new facts about the Bible and establish your knowledge on Biblical History with the Bible Trivia game!',
			linkRef: 'trivia'
		}
	];
</script>

<div class="flex flex-col justify-center align-center items-center p-4 space-y-4">
	<h3 class="w-full text-3xl font-bold">Learning Activities</h3>
	<hr class="w-full bg-surface-700" />

	<div class="grid w-full grid-flow-row grid-cols-1 gap-8 p-4">
		{#each learningRoutes as route}
			<a class="w-full col-span-1" href="/home/learn/{route.linkRef}">
				<div
					class="flex flex-col h-48 variant-glass-primary hover:bg-primary-900 rounded-xl justify-center items-center"
				>
					<h3 class="text-2xl text-center font-bold">
						{route.name}
					</h3>
					<p class="text-lg text-center font-semibold p-4">{route.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
