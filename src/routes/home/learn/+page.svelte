<script>
	const learningRoutes = ['memory', 'trivia'];
</script>

<div class="flex flex-col justify-center align-center items-center p-4 space-y-4">
	<h3 class="w-full text-3xl font-bold">Learning Activities</h3>
	<hr class="w-full bg-surface-700" />
	<div class="grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-8 p-8">
		{#each learningRoutes as route}
			<a href="/home/learn/{route}">
				<div
					class="w-32 flex variant-glass-primary rounded-xl aspect-square justify-center items-center text-center text-xl font-semibold"
				>
					{route.toUpperCase()}
				</div>
			</a>
		{/each}
	</div>
</div>
