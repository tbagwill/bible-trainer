<script lang="ts">
	import { ArrowForwardIcon } from '$lib/icons';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let message: string;
	let submitFail: string;
	
	$: {
		message = $page.error?.message ?? '';
	} 
</script>

{#if message}
	<aside class="alert variant-ghost">
		<div class="alert-message">
			<h3 class="h3">(title)</h3>
			<p>{message}</p>
		</div>
	</aside>
{/if}

<div class="container h-full mx-auto flex flex-col justify-start items-center">
	<div class="w-full flex flex-col justify-center p-4 m-4">
		<h3 class="text-5xl text-center m-12"> Welcome to Bible Trainer </h3>
		<p class="text-center"> Whether you're back again or trying for the first time, enter your email below. </p>
	</div>
	
	<div class="card p-4 variant-glass-surface w-11/12 lg:w-1/2">
		<div class="p-2 gap-2">
			<form class="gap-2 p-2 m-2" method="POST" use:enhance>
				<div>
					<label class="label mb-2" for="email"> Email </label>
					<p class={submitFail}></p>
					<input
					class="input p-2 pl-4 mb-2"
					title="Input (email)"
					name="email"
					type="email"
					placeholder="john@example.com"
					autocomplete="email"
					/>
					
					<button
					type="submit"
					class="btn btn-md variant-filled-primary mt-4"
					>
					<ArrowForwardIcon color="--on-primary" />
				</button>
				
			</div>
			</form>
		</div>
	</div>
</div>
