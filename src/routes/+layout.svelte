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

	import { userInfo } from '$lib/stores/userStore';
	import { NavigationList, Logout, ProfileImagePopup } from '$lib/components';
	import { HamburgerIcon, LogoutIcon, AboutIcon, SettingsIcon } from '$lib/icons';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	export let data;
	let { supabase, session, user } = data;
	$: ({ supabase, session, user } = data);

	initializeStores();
	export const drawerStore = getDrawerStore();
	export const toastStore = getToastStore();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let profilePopValue: string;

	const profilePop: PopupSettings = {
		event: 'focus-click',
		target: 'profilePop',
		placement: 'bottom',
		middleware: { offset: 24 },
		closeQuery: '.listbox-item'
	};

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

	// @ts-ignore
	let userImg = $userInfo.userImage;
	let cancelShell: string | string;

	// prettier-ignore
	$: if (browser) cancelShell = $page.route.id === '/' || $page.route.id === '/confirm' ? 'hidden' : '';
	$: avatar = userImg ? user?.user_metadata.userImage : '';
</script>

<Toast />

<Modal components={modalComponentRegistry} />

<Drawer bgDrawer="bg-surface-500" width="w-3/4" shadow="shadow-xl">
	<h3 class="text-3xl font-bold m-3 p-3">Navigation</h3>
	<hr class="bg-surface-700" />
	<NavigationList />
</Drawer>

<div class="card w-40 shadow-2xl py-3 px-2" data-popup="profilePop" style="z-index:1000">
	<ListBox
		rounded="rounded-none"
		spacing="space-y-4"
		active="variant-soft-primary"
		hover="hover:variant-soft-secondary"
	>
		<ListBoxItem
			bind:group={profilePopValue}
			id="profile"
			name="medium"
			value="profile"
			rounded="rounded-full"
			spacing="space-x-4"
			on:click={() => {
				goto('/home/profile'), (profilePopValue = '');
			}}
		>
			<svelte:fragment slot="lead">
				<AboutIcon color="white" />
			</svelte:fragment>
			Profile
		</ListBoxItem>
		<ListBoxItem
			bind:group={profilePopValue}
			id="settings"
			name="medium"
			value="settings"
			rounded="rounded-full"
			spacing="space-x-4"
			on:click={() => {
				goto('/home/profile/settings'), (profilePopValue = '');
			}}
		>
			<svelte:fragment slot="lead">
				<SettingsIcon color="white" />
			</svelte:fragment>
			Settings
		</ListBoxItem>
		<ListBoxItem
			bind:group={profilePopValue}
			id="logout"
			name="medium"
			value="logout"
			rounded="rounded-full"
			spacing="space-x-4"
		>
			<svelte:fragment slot="lead">
				<LogoutIcon color="red" />
			</svelte:fragment>
			<Logout />
		</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<AppShell slotHeader={cancelShell} slotSidebarLeft={cancelShell}>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-icon btn-md rounded-full" on:click={() => drawerOpen()}>
					<HamburgerIcon color="white" />
				</button>
			</svelte:fragment>

			<h3 class="text-3xl text-center font-bold md:text-left">Bible Trainer</h3>

			<svelte:fragment slot="trail">
				<button
					id="avatarButton"
					class="btn btn-icon variant-ghost justify-between mx-2 md:mx-4 my-2"
					use:popup={profilePop}
				>
					<!--  -->
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
