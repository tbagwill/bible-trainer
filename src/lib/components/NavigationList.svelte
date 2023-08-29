<script>
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const links = {
		dashboard: '/home/dashboard',
		scripture: '/home/scripture',
		learn: '/home/learn',
		search: '/home/search'
	};

	function drawerClose() {
		drawerStore.close();
	}

	$: classesActive = (href) => (href === $page.url.pathname ? 'bg-primary-900 font-semibold' : '');
</script>

<nav class="list-nav p-2">
	<ul class="m-2">
		<li>
			<a
				id="dashboard"
				href={links.dashboard}
				class={classesActive(links.dashboard)}
				on:click={() => drawerClose()}>Dashboard</a
			>
		</li>
		<li>
			<a
				id="scripture"
				href={links.scripture}
				class={classesActive(links.scripture)}
				on:click={() => drawerClose()}>Scripture</a
			>
		</li>
		<li>
			<a
				id="learn"
				href={links.learn}
				class={classesActive(links.learn)}
				on:click={() => drawerClose()}>Learn</a
			>
		</li>
		<li>
			<a
				id="search"
				href={links.search}
				class={classesActive(links.search)}
				on:click={() => drawerClose()}>Search</a
			>
		</li>
	</ul>
</nav>
