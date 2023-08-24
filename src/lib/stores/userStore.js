import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { supabase } from "$lib/supabaseClient";
import { fail } from "@sveltejs/kit";
import { writable } from "svelte/store";

export const userStore = writable([]);

export let userPref;

export async function loadUser( userId ) {
    const { data: users_data, error: err } = await supabase
        .from('users_data')
        .select('*')
        .eq( 'id', userId );

    const img = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${userId}/avatar.png?width=256&height=256`

    if( err ) {
        return fail(500, 'Could not retrieve')
    }

    if( users_data ) {
        userStore.set({
           ...users_data[0],
           img
        })
    }

    userStore.subscribe( (values) => {
        userPref = values
    })
}