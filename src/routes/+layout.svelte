<script lang="ts">
	import '../app.postcss';

	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { initializeStores } from '@skeletonlabs/skeleton';

	import NavigationList from '$lib/components/NavigationList.svelte';
	import { HamburgerIcon, LogoutIcon } from '$lib/icons';

	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { AppShell, AppBar, Drawer, getDrawerStore, ListBox, ListBoxItem, Avatar, popup, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import AboutIcon from '$lib/icons/AboutIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';

	import { page } from '$app/stores';
	import Logout from '$lib/components/Logout.svelte';
	import { userPref } from '$lib/stores/userStore';
	
	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	
	initializeStores()

	const drawerStore = getDrawerStore()
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	
	let profileDropValue: string;

	const popupProfile: PopupSettings = {
		event: 'focus-click',
		target: 'popupProfile',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
				


	function drawerOpen() {
    	drawerStore.open({});
	}
	
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});

	$: cancelShell = $page.route.id === '/' || $page.route.id === '/confirm' ? 'hidden' : ''

</script>

<div class="card flex-col items-center bg-surface-700 w-16 shadow-xl py-2 z-100" style="z-index:1000" data-popup="popupProfile">
	<ListBox rounded="rounded-none">
		<ListBoxItem spacing='space-x-2' padding='px-2 py-2' regionDefault='flex flex-row justify-center' bind:group={profileDropValue} name="medium" value="profile" on:click={ () => goto('/home/profile') }>
			<AboutIcon />
		</ListBoxItem>
		<ListBoxItem spacing='space-x-2' padding='px-2 py-2' regionDefault='flex flex-row justify-center' bind:group={profileDropValue} name="medium" value="settings" on:click={ () => goto('/home/profile/settings') }>
			<SettingsIcon />
		</ListBoxItem>
		<ListBoxItem spacing='space-x-2' padding='px-2 py-2' regionDefault='flex flex-row justify-center' bind:group={profileDropValue} name="medium" value="logout">
				<Logout />
		</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<Drawer bgDrawer='bg-surface-500' width='w-3/4' shadow='shadow-xl'>
	<h3 class="text-3xl font-bold m-3 p-3">
		Navigation
	</h3>
	<hr class="bg-surface-700"/>
	<NavigationList />
</Drawer>

<AppShell slotHeader={cancelShell} slotSidebarLeft={cancelShell}>
	<svelte:fragment slot="header">
		<AppBar>

			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-icon btn-md rounded-full" on:click={ () => drawerOpen() }>
					<HamburgerIcon color='white'/>
				</button>	
			</svelte:fragment>

			<h3 class="text-3xl text-center font-bold md:text-left">
				Bible Trainer
			</h3>

			<svelte:fragment slot="trail">
				
				<button class="btn btn-icon variant-ghost justify-between mx-2 md:mx-4 my-2" use:popup={popupProfile}>
					<Avatar initials={ session?.user.email?.charAt(0) } src={userPref.img} border='hover:!border-primary-500 hover:border-2'>

					</Avatar>
				</button>
					
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="w-0 md:w-52 h-full bg-surface-800" >
			<NavigationList />
		</div>
	</svelte:fragment>

	<slot/>
</AppShell>


					