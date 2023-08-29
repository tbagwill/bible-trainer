<script>
	export let parent;

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { stockAvatars } from '$lib/data/stockAvatars';
	import { userImage } from '$lib/stores/userStore';

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="card w-full shadow-2xl space-y-4 p-8">
		<h3 class="text-2xl font-bold my-4">Select your preferred avatar</h3>
		<div class="w-full grid grid-flow-row grid-cols-3 gap-4 md:gap-8 p-4">
			{#each stockAvatars as avatar}
				<div class="flex w-full justify-center">
					<button
						class="w-full aspect-square rounded-full"
						on:click={() => {
							userImage.set(avatar), modalStore.close();
						}}
					>
						<img class="w-full rounded-full" src={avatar} alt="stock avatar {avatar}" />
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
