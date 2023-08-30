<script>
	import LogoutIcon from '$lib/icons/LogoutIcon.svelte';
	import { userInfo } from '$lib/stores/userStore';
</script>

<form method="POST" action="/auth/logout">
	<button class="hover:animate-none focus:animate-none" type="submit" on:click={userInfo.set()}>
		Logout
	</button>
</form>
