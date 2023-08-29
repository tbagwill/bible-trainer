/** @type {import('./$types').Actions} */
import { PUBLIC_BIBLE_API_KEY } from '$env/static/public';
import { updatePreferencesSchema } from '$lib/data/validSchemas';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { userImage } from '$lib/stores/userStore';

export async function load({ event, fetch, locals, parent }) {
	await parent();
	const preferencesForm = await superValidate(updatePreferencesSchema);

	const res = await fetch(`https://api.scripture.api.bible/v1/bibles?language=eng`, {
		headers: {
			'api-key': PUBLIC_BIBLE_API_KEY
		}
	})
		.then((response) => response.json())
		.then((versions) => {
			const data = versions.data;
			return data;
		})
		.catch((err) => {
			console.log(err);
		});

	const versions = res;

	return {
		versions: versions,
		preferencesForm
	};
}

export const actions = {
	updatePreferences: async ({ request, locals }) => {
		const preferencesForm = await superValidate(request, updatePreferencesSchema);

		console.log('updateForm: ', preferencesForm);

		if (!preferencesForm.valid) return fail(400, { preferencesForm, invalid: true });

		userImage.set('');

		const { user, error: err } = await locals.supabase.auth.updateUser({
			data: preferencesForm.data
		});

		locals.user = locals.getUser();

		if (err) return fail(400, { err, invalid: true });

		return { preferencesForm, success: true };
	}
};
