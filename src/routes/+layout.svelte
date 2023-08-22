<script lang="ts">
	import '../app.postcss';

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { initializeStores } from '@skeletonlabs/skeleton';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	initializeStores()
	
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


</script>

<slot />
