import { writable } from 'svelte/store';

export const userInfo = writable([]);

export const userImage = writable('');

export function loadUser(user) {
	userInfo.set(user.user_metadata);
}
