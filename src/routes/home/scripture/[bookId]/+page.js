import { PUBLIC_BIBLE_API_KEY } from '$env/static/public';

export async function load({ fetch, params, parent }) {
	await parent();

	const res = await fetch(
		`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books/${params.bookId}/chapters`,
		{
			headers: {
				'api-key': PUBLIC_BIBLE_API_KEY
			}
		}
	)
		.then((response) => response.json())
		.then((chapters) => {
			const data = chapters.data;
			return data;
		})
		.catch((err) => {
			console.log(err);
		});

	const chapters = res;

	return {
		chapters: chapters
	};
}
