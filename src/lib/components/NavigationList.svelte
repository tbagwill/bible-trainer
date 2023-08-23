<script>
	import { page } from "$app/stores";
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    function drawerClose() {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-2">
    <ul class="m-2">
        <li><a id="dashboard" href="/home/dashboard" on:click={() => drawerClose()}>Dashboard</a></li>
		<li><a id="scripture" href="/home/scripture" on:click={() => drawerClose()}>Scripture</a></li>
		<li><a id="memoryverse" href="/home/memoryverse" on:click={() => drawerClose()}>Memory Verse</a></li>
		<li><a id="search" href="/home/search" on:click={() => drawerClose()}>Search</a></li>
    </ul>
</nav>