import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { loadUser } from '$lib/stores/userStore.js';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (session) {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		loadUser(user);
		return { supabase, session, user };
	}

	if (url.pathname.includes('home') && !session) {
		redirect(308, '/');
	}

	return { supabase, session };
};
