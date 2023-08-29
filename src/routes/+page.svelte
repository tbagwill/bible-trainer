<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { ArrowForwardIcon } from '$lib/icons';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	let tab: string = 'login';

	const { form: loginForm, errors, enhance } = superForm(data.loginForm, { resetForm: true });

	const {
		form: signupForm,
		errors: signupErrors,
		enhance: signupEnhance
	} = superForm(data.signupForm, { resetForm: true });
</script>

<div class="container h-full mx-auto flex flex-col justify-start items-center">
	<div class="w-full flex flex-col justify-center p-4 m-4">
		<h3 class="text-2xl md:text-5xl text-center font-semibold m-12">Welcome to Bible Trainer</h3>
	</div>

	<div class="card p-4 variant-glass-surface w-11/12 lg:w-1/2">
		<div class="w-full flex flex-col">
			<TabGroup justify="justify-center">
				<Tab bind:group={tab} name="login" value="login">
					<h2 class="text-md font-semibold">Login</h2>
				</Tab>
				<Tab bind:group={tab} name="signup" value="signup">
					<h2 class="text-md font-semibold">Signup</h2>
				</Tab>
				<svelte:fragment slot="panel">
					{#if tab === 'signup'}
						<form
							name="signup"
							class="gap-2 p-2 m-2"
							method="POST"
							action="?/signup"
							use:signupEnhance
						>
							<label class="label mb-2" for="username"> Username </label>

							<input
								class="input p-2 pl-4 mb-2"
								title="Input (username)"
								name="username"
								type="text"
								placeholder="Enter a username"
								autocomplete="nickname"
								bind:value={$signupForm.username}
							/>
							{#if $signupErrors.username}<span class="invalid">{$signupErrors.username}</span>{/if}

							<label class="label mb-2" for="name"> Name </label>

							<input
								class="input p-2 pl-4 mb-2"
								title="Input (name)"
								name="name"
								type="text"
								placeholder="What should we call you?"
								autocomplete="given-name"
								bind:value={$signupForm.name}
							/>
							{#if $signupErrors.name}<span class="invalid">{$signupErrors.name}</span>{/if}

							<label class="label mb-2" for="email"> Email </label>

							<input
								class="input p-2 pl-4 mb-2"
								title="Input (email)"
								name="email"
								type="email"
								placeholder="john@example.com"
								autocomplete="email"
								bind:value={$signupForm.email}
							/>
							{#if $signupErrors.email}<span class="invalid">{$signupErrors.email}</span>{/if}

							<label class="label mb-2" for="password"> Password </label>

							<input
								class="input p-2 pl-4 mb-2"
								title="Input (password)"
								name="password"
								type="password"
								placeholder="Create your password"
								autocomplete="new-password"
								bind:value={$signupForm.password}
							/>
							{#if $signupErrors.password}<span class="invalid">{$signupErrors.password}</span>{/if}
							{#if form?.invalid}
								<aside class="alert variant-ghost-error mt-4" transition:fade>
									<!-- Message -->
									<div class="alert-message">
										<h3 class="h3">Sorry!</h3>
										<p>Could not create your account. Please try again.</p>
									</div>
								</aside>
							{/if}
							<div class="flex flex-row justify-center">
								<button
									type="submit"
									formaction="?/signup"
									class="btn btn-md variant-filled-primary mt-4"
								>
									<h3 class="text-lg font-bold">Signup</h3>
									<ArrowForwardIcon color="--on-primary" />
								</button>
							</div>
						</form>
					{:else}
						<form name="login" class="gap-2 p-2 m-2" method="POST" action="?/login" use:enhance>
							<label class="label mb-2" for="email"> Email </label>

							<input
								class="input p-2 pl-4 mb-2"
								title="Input (email)"
								name="email"
								type="email"
								placeholder="john@example.com"
								autocomplete="email"
								bind:value={$loginForm.email}
							/>
							{#if $errors.email}<span class="alert">{$errors.email}</span>{/if}

							<label class="label mb-2" for="password"> Password </label>

							<input
								class="input p-2 pl-4 mb-2"
								title="Input (password)"
								name="password"
								type="password"
								placeholder="Create your password"
								autocomplete="new-password"
								bind:value={$loginForm.password}
							/>
							{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
							{#if form?.invalid}
								<aside class="alert variant-ghost-error mt-4" transition:fade>
									<!-- Message -->
									<div class="alert-message">
										<h3 class="h3">Sorry!</h3>
										<p>Could not log you in. Please try again.</p>
									</div>
								</aside>
							{/if}

							<div class="flex flex-row justify-center">
								<button
									type="submit"
									class="btn btn-md variant-filled-primary mt-4"
									formaction="?/login"
								>
									<h3 class="text-lg font-bold">Login</h3>
									<ArrowForwardIcon color="--on-primary" />
								</button>
							</div>
						</form>
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
	</div>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
