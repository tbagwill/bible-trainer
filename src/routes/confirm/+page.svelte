<script>
	import { page } from '$app/stores';
	import { ArrowForwardIcon } from '$lib/icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	const { form: supaForm, errors, enhance } = superForm(data.verifyForm, { resetForm: true });
</script>

<div class="flex h-full justify-center p-8 mt-16">
	<div class="flex flex-col text-center">
		<h3 class="text-3xl">Let's confirm that email!</h3>

		<form name="verify" method="POST" action="?/verify" use:enhance>
			<input
				class="input variant-outline-secondary rounded text-center text-4xl mt-4 p-4"
				name="token"
				maxlength="6"
				bind:value={$supaForm.token}
			/>
			{#if $errors.token}<p class="invalid w-full text-left text-sm">{$errors.token}</p>{/if}
			{#if form?.invalid}
				<aside class="alert variant-ghost-error mt-4" transition:fade>
					<!-- Message -->
					<div class="alert-message">
						<h3 class="h3">Sorry!</h3>
						<p>Could not verify your token. Try sending a new one.</p>
					</div>
				</aside>
			{/if}

			<button
				type="submit"
				class="btn variant-filled-primary w-full mt-4 p-4 rounded"
				formaction="?/verify"
			>
				<h3 class="text-lg font-bold">Verify</h3>
				<ArrowForwardIcon color="--on-primary" />
			</button>
		</form>
	</div>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
