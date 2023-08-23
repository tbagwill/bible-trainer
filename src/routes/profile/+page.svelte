<script>
	import { page } from "$app/stores";
	import { RefreshIcon } from "$lib/icons";
    import { Avatar, FileButton } from "@skeletonlabs/skeleton";

    const user = $page.data.session.user;

    console.log( user )
</script>

<div class="flex flex-col w-full p-4">
    <h3 class="text-2xl font-bold mb-4 text-center md:text-left">Profile</h3>
    
    <div class="flex flex-col justify-center items-center md:items-start md:flex-row space-y-4 space-x-4">
        <label for='avatar' class='btn btn-icon w-32'>
            <Avatar initials={user.email.charAt(0)} width='w-32'/>
        </label>
        
        <label for='email' class='label text-sm mx-4 mb-2 font-semibold'>
            Email: {user.email}
        </label>
    </div>

</div>