<script>
	export let data;

	console.log('page data verse:', data.verse);
</script>

<div class="block w-full">
	<h3 class="text-3xl m-4 p-4">
		{data.verse.reference}
	</h3>
	<p class="text-xl m-4 p-4">
		{data.verse.content}
	</p>
</div>
