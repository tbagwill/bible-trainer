<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';

	import {
		AppShell,
		AppBar,
		Avatar,
		Drawer,
		getDrawerStore,
		initializeStores,
		ListBox,
		ListBoxItem,
		LightSwitch,
		Modal,
		getModalStore,
		Toast,
		getToastStore,
		popup,
		storePopup,
		type ModalComponent,
		type ModalSettings,
		type PopupSettings,
		type ToastSettings,
		type ToastStore
	} from '@skeletonlabs/skeleton';

	import { NavigationList, Logout, ProfileImagePopup } from '$lib/components';
	import { HamburgerIcon, LogoutIcon, AboutIcon, SettingsIcon } from '$lib/icons';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { loadUser, userInfo } from '$lib/stores/userStore';

	export let data;
	let { supabase, session, user } = data;
	$: ({ supabase, session, user } = data);

	initializeStores();
	export const drawerStore = getDrawerStore();
	export const toastStore = getToastStore();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let profilePopValue: string;

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		ImageCropperModal: {
			// Pass a reference to your custom component
			ref: ProfileImagePopup,
			// Add the component properties as key/value pairs
			props: {},
			// Provide a template literal for the default component slot
			slot: '<p>Skeleton</p>'
		}
	};

	function drawerOpen() {
		console.log('drawer open');
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

	let cancelShell: string | string;

	// prettier-ignore
	$: if (browser) cancelShell = $page.route.id === '/' || $page.route.id === '/confirm' ? 'hidden' : '';
	$: avatar = user ? user?.user_metadata.userImage : '';
</script>

<Toast />

<Modal components={modalComponentRegistry} />

<Drawer bgDrawer="bg-surface-500" width="w-3/4" shadow="shadow-xl">
	<h3 class="text-3xl font-bold m-3 p-3">Navigation</h3>
	<hr class="bg-surface-700" />
	<NavigationList />
</Drawer>

<AppShell slotHeader={cancelShell} slotSidebarLeft={cancelShell}>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-700">
			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-icon btn-md rounded-full" on:click={() => drawerOpen()}>
					<HamburgerIcon color="rgba(var(--on-secondary))" />
				</button>
			</svelte:fragment>

			<h3 class="text-3xl text-center font-bold md:text-left">Bible Trainer</h3>

			<svelte:fragment slot="trail">
				<button
					id="avatarButton"
					class="btn btn-icon variant-ghost justify-between mx-2 md:mx-4 my-2"
					on:click={() => goto('/home/profile')}
				>
					<Avatar
						initials={user?.user_metadata.username.charAt(0) ?? ''}
						border="hover:!border-primary-500 hover:border-2"
						src={avatar}
					/>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="w-0 md:w-52 h-full bg-surface-800">
			<NavigationList />
		</div>
	</svelte:fragment>

	<slot />
</AppShell>
