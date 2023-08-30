<script>
	import { page } from '$app/stores';
	import { AddIcon } from '$lib/icons';
	import { Avatar, getModalStore } from '@skeletonlabs/skeleton';
	import { userImage, userInfo, loadUser } from '$lib/stores/userStore';
	import { superForm } from 'sveltekit-superforms/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;
	$: svelteForm = $page.form;
	const toastStore = getToastStore();

	const profileChangeToast = {
		message: 'Profile successfully updated!',
		timeout: 2000,
		hideDismiss: true,
		background: 'variant-filled-success'
	};

	const profileChangeErrorToast = {
		message: 'Unable to update profile. Please try again.',
		timeout: 2500,
		hideDismiss: true,
		background: 'variant-filled-error'
	};

	const profileModal = {
		type: 'component',
		component: 'ImageCropperModal',
		width: 'w-full',
		height: 'h-full'
	};

	function showModal() {
		console.log('Triggered!');
		modalStore.trigger(profileModal);
		console.log($modalStore);
	}

	const {
		form: preferencesForm,
		errors,
		enhance
	} = superForm(data.preferencesForm, {
		resetForm: false,
		onUpdated: () => {
			if (svelteForm?.success) {
				userImage.set('');
				toastStore.trigger(profileChangeToast);
			} else toastStore.trigger(profileChangeErrorToast);
		}
	});

	const user = $page.data.user;
	const versions = $page.data.versions;
	const modalStore = getModalStore();

	$: previewImg = $userImage === '' ? $userInfo.userImage : $userImage;
</script>

<div class="flex flex-col w-full p-4 space-y-4">
	<h3 class="text-3xl font-bold">Settings</h3>
	<hr />

	<div class="flex flex-col w-full space-y-4">
		<label for="avatar" class="label text-sm font-semibold"> Profile Image </label>

		<div class="flex flex-row justify-center ml-10">
			<Avatar
				id="avatar-preview"
				initials={user?.user_metadata.username.charAt(0) ?? ''}
				width="w-32 md:48"
				shadow="shadow-2xl"
				src={previewImg}
			/>

			<div class="relative right-11 top-20">
				<button class="btn btn-icon variant-filled-primary" on:click={() => showModal()}>
					<AddIcon color="fill-on-primary-token" />
				</button>
			</div>
		</div>
	</div>
	<form
		id="preference"
		method="POST"
		action="?/updatePreferences"
		class="space-y-4"
		enctype="multipart/form-data"
		use:enhance
	>
		<input name="userImage" class="hidden h-0 m-0 p-0" bind:value={previewImg} />

		<div class="flex flex-col w-full space-y-4">
			<label for="username" class="text-sm font-semibold"> Username </label>
			<input
				name="username"
				class="input w-full rounded-lg"
				placeholder="Username"
				bind:value={$userInfo.username}
			/>
			{#if $errors.username}<p class="invalid">{$errors.username}</p>{/if}
		</div>

		<div class="flex flex-col w-full space-y-4">
			<label for="name" class="text-sm font-semibold"> Name </label>
			<input
				name="name"
				class="input w-full rounded-lg"
				placeholder="John"
				bind:value={$userInfo.name}
			/>
			{#if $errors.name}<p class="invalid">{$errors.name}</p>{/if}
		</div>

		<label for="version" class="label text-sm font-semibold"> Bible Version </label>
		<select
			name="version"
			id="version"
			class="select w-full"
			form="preference"
			bind:value={$userInfo.version}
		>
			<!-- <option disabled selected> Choose your preferred text </option> -->
			{#each versions as version}
				<option
					class="my-1 p-1"
					value={version.id}
					on:change={() => ($preferencesForm.version = this.value)}
				>
					{version.name}
				</option>
			{/each}
		</select>

		<div class="flex w-full justify-center">
			<button
				type="submit"
				formaction="?/updatePreferences"
				class="btn btn-md variant-filled-primary w-1/2 md:w-1/4 my-4"
			>
				Submit Changes
			</button>
		</div>
	</form>
</div>

<style>
	.invalid {
		color: red;
	}
</style>
