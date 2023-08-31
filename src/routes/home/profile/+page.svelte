<script>
	import { page } from '$app/stores';
	import { SettingsIcon } from '$lib/icons';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Logout } from '$lib/components';
	import { goto } from '$app/navigation';

	const user = $page.data.user;
	const memberSince = new Date(user.email_confirmed_at);
	console.log(user);
</script>

<div class="flex flex-col justify-center items-center w-full p-4">
	<div class="flex flex-col md:flex-row justify-between w-full items-center align-middle space-y-4">
		<Avatar
			initials={user?.user_metadata.username.charAt(0) ?? ''}
			src={user?.user_metadata.userImage}
			width="w-32 md:w-48"
		/>
		<div class="card w-full bg-surface-400 p-4 mx-4 space-y-2">
			<div class="flex justify-between items-center">
				<h3 class="text-3xl font-bold">{user?.user_metadata.username}</h3>
				<button
					class="btn-icon-base justify-center items-center"
					on:click={() => goto('/home/profile/settings')}
				>
					<SettingsIcon size="32" color="rgba(var(--on-secondary))" />
				</button>
			</div>
			<div class="flex justify-between items-center">
				<h1 class="text-xl font-semibold">{user?.user_metadata.name}</h1>
				<h1 class="text-xl font-semibold">{user?.email}</h1>
			</div>
			<div class="flex justify-between items-center">
				<h1 class="text-md font-semibold">Member since:</h1>
				<h1 class="text-md font-semibold">{memberSince.toString().substring(4, 15)}</h1>
			</div>
			<div class="flex justify-end items-center">
				<h1 class="text-sm font-semibold text-green-500">{user.aud}</h1>
			</div>
		</div>
	</div>

	<button class="w-1/2 md:w-1/4 btn variant-filled-error my-8"> <Logout /> </button>
</div>
