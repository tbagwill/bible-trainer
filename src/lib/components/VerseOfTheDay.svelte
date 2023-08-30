<script>
	export let verse;
</script>

<div class="card shadow-2xl w-11/12 variant-outline-secondary p-4 mb-2">
	<a href="/home/scripture/{verse.bookId}/{verse.chapterId}/{verse.id}">
		<header class="card-header mb-4">
			<h3 class="text-2xl font-bold">
				{verse.reference}
			</h3>
		</header>
		<hr class="bg-secondary-900 h-0.5 rounded-full" />
		<div class="mt-2 p-4 font-semibold">
			<p class="text-lg">
				{verse.content}
			</p>
		</div>
	</a>
</div>
