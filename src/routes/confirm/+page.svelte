<script>
	import { enhance } from '$app/forms';
</script>

<div class="flex h-full justify-center p-8">
	<div class="flex flex-col text-center">
		<h3 class="text-3xl">Let's confirm that email!</h3>
		<form method="POST" action="?/verify" use:enhance>
			<input
				class="input variant-outline-secondary rounded text-center text-4xl mt-4 p-4"
				name="token"
				maxlength="6"
			/>
			<button class="btn variant-filled-primary w-full mt-4 p-4 rounded" formaction="?/verify">
				Verify
			</button>
		</form>
	</div>
</div>
