<script>
	import LogoutIcon from "$lib/icons/LogoutIcon.svelte";
</script>

<form method="POST" action="/auth/logout">
    <button type="submit">
        <LogoutIcon color='red'/>
    </button>
</form>