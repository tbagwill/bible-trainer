<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import AddIcon from "$lib/icons/AddIcon.svelte";
    import { userPref } from "$lib/stores/userStore";
    import { Avatar, FileButton } from "@skeletonlabs/skeleton";

    const user = $page.data.session.user
    const versions = $page.data.versions

    let bibleVersion = userPref.preferred_bible_version;
    let file;
    let newFile;
    let name;

    const showPreview = (event) => {
        const target = event.target
        const files = target.files

        if( files.length > 0 ) {
            const src = URL.createObjectURL(files[0])
            const preview = document.getElementById('avatar')
            preview.src = src
        }
    }

    $: {
        newFile = file ? file[0] : userPref.img
        console.log( newFile )
        console.log( userPref )
    }

</script>

<div class="flex flex-col w-full p-4 space-y-4">
    <h3 class="text-3xl font-bold">
        Settings
    </h3>
    <hr />
    <form id='preference' method='POST' action='?/updatePreferences' class='space-y-4' enctype="multipart/form-data" use:enhance>

            <div class='flex flex-col w-full space-y-4'>

                <label for='avatar' class='label text-sm font-semibold'> Profile Image </label>
                <div class="flex flex-row justify-center ml-10">
                    <Avatar id='avatar' initials={user.email.charAt(0)} src={newFile} width='w-32 md:48' shadow='shadow-2xl'/>
                    <div class='relative right-11 top-20'>
                        <FileButton id='upload' button='btn btn-icon variant-filled-primary' bind:files={file} name='avatar' on:change={showPreview}> <AddIcon color='fill-on-primary-token'/> </FileButton>
                    </div>
                </div>

            </div>
            <div class='flex flex-col w-full space-y-4'>

                <label for='name' class='text-sm font-semibold'> Name </label>
                <input name='name' class='input w-full rounded-lg' placeholder='John' bind:value={name} />
            </div>



        <label for='verSelect' class='label text-sm font-semibold'> Bible Version </label>
        <select name='version' id='verSelect' class="select w-full" bind:value={bibleVersion} form='preference'>
            {#each versions as version}
            <option value={version.id} on:change={ () => bibleVersion = this.value }>
                {version.name}
            </option>
            {/each}
        </select>

        <div class='flex w-full justify-center'>
            <button type='submit' formaction='?/updatePreferences' class='btn btn-md variant-filled-primary my-4'>
                Update Preferences
            </button>
        </div>
    </form>
</div>