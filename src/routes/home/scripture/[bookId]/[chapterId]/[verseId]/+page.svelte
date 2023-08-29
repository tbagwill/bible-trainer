<script>
	import { page } from '$app/stores';

	const verse = $page.data.verse;

	console.log('page data verse:', verse);
</script>

<div class="block w-full">
	<h3 class="text-3xl m-4 p-4">
		{verse.reference}
	</h3>
	<p class="text-xl m-4 p-4">
		{verse.content}
	</p>
</div>
