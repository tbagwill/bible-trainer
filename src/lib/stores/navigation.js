import { goto } from "$app/navigation";
import { writable } from "svelte/store";

export const currTab = writable('dashboard');

export function navigateTabTo( newTab ) {
    currTab.set(newTab);
    goto(`/home/${newTab}`)
}