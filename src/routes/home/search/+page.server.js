import { PUBLIC_BIBLE_API_KEY } from '$env/static/public';
import { fail } from '@sveltejs/kit';

export const actions = {
	search: async ({ request, fetch }) => {
		const formData = await request.formData();
		const query = formData.get('query');

		const res = await fetch(
			`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/search?query=${query}&sort=relevance`,
			{
				headers: {
					'api-key': PUBLIC_BIBLE_API_KEY
				}
			}
		)
			.then((response) => response.json())
			.then((results) => {
				const data = results.data;
				return data;
			})
			.catch((err) => {
				console.error(err);
			});

		const results = res;

		return {
			results: { ...results, empty: false },
			success: true
		};
	}
};
