<script>
	import HamburgerIcon from '$lib/icons/HamburgerIcon.svelte';
import LogoutIcon from '$lib/icons/LogoutIcon.svelte';
	import { currTab, navigateTabTo } from '$lib/stores/navigation';

	import { AppShell, AppBar, ListBox, ListBoxItem, Drawer } from '@skeletonlabs/skeleton';

	let navValue = $currTab;
</script>

<Drawer>

</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-icon btn-md rounded-full">
					<HamburgerIcon />
				</button>	
			</svelte:fragment>
			<h3 class="text-3xl text-center">Bible Trainer</h3>
			<svelte:fragment slot="trail">
				<form action="/auth/logout" method="POST">
					<button class="btn btn-icon" type="submit">
						<LogoutIcon color='white' />
					</button>
				</form>
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="w-0 md:w-52 h-full bg-surface-900" >
			<ListBox spacing="space-y-2" padding="px-8 py-2" active="variant-filled-secondary" rounded="rounded-r-full">
				<ListBoxItem bind:group={navValue} name="medium" value="dashboard" on:change={() => {navigateTabTo('dashboard')}}>Dashboard</ListBoxItem>
				<ListBoxItem bind:group={navValue} name="medium" value="scripture" on:change={() => {navigateTabTo('scripture')}}>Scripture</ListBoxItem>
				<ListBoxItem bind:group={navValue} name="medium" value="memoryverse" on:change={() => {navigateTabTo('memoryverse')}}>Memory Verse</ListBoxItem>
				<ListBoxItem bind:group={navValue} name="medium" value="search" on:change={() => {navigateTabTo('search')}}>Search</ListBoxItem>
			</ListBox>
		</div>
	</svelte:fragment>

	<slot />
</AppShell>
