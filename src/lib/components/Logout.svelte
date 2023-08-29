<script>
	import LogoutIcon from '$lib/icons/LogoutIcon.svelte';
</script>

<form method="POST" action="/auth/logout">
	<button class="hover:animate-none focus:animate-none" type="submit"> Logout </button>
</form>
