<script>
	import { page } from "$app/stores";
    import { Avatar } from "@skeletonlabs/skeleton";
    import { userPref } from "$lib/stores/userStore";

    const user = $page.data.session.user;
</script>

<div class="flex w-full p-4">
    <div class="flex flex-col w-full">
        <h3 class="text-2xl font-bold mb-4 text-center md:text-left">Profile</h3>
        
        <div class="flex flex-col justify-center items-center space-y-4">

            <div class='btn btn-icon w-32'>
                <Avatar initials={user.email.charAt(0)} src={userPref.img} width='w-32' shadow='shadow-2xl'/>
            </div>
            
            <h3 class='text-md text-center font-semibold'>
                {user.email}
            </h3>

        </div>
    </div>
</div>