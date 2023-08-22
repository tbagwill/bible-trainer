<script>
	import { page } from '$app/stores';
	import NavigationList from '$lib/components/NavigationList.svelte';
	import HamburgerIcon from '$lib/icons/HamburgerIcon.svelte';
	import LogoutIcon from '$lib/icons/LogoutIcon.svelte';
	import { AppShell, AppBar, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	getDrawerStore()

	const drawerStore = getDrawerStore()

	function drawerOpen() {
    	drawerStore.open({});
	}

</script>

<Drawer bgDrawer='bg-surface-500'>
	<h3 class="text-3xl font-bold m-3 p-3">
		Navigation
	</h3>
	<hr class="bg-surface-700"/>
	<NavigationList />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-icon btn-md rounded-full" on:click={ () => drawerOpen() }>
					<HamburgerIcon color='white'/>
				</button>	
			</svelte:fragment>
			<h3 class="text-3xl text-center md:text-left">Bible Trainer</h3>
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
		<div id="sidebar-left" class="w-0 md:w-52 h-full bg-surface-800" >
			<NavigationList />
		</div>
	</svelte:fragment>

	<slot />
</AppShell>
