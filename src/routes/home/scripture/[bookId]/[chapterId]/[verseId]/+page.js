import { PUBLIC_BIBLE_API_KEY } from '$env/static/public';

export async function load({ params, parent }) {
	await parent();

	const res = await fetch(
		`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${params.verseId}?content-type=text&include-notes=true&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`,
		{
			headers: {
				'api-key': PUBLIC_BIBLE_API_KEY
			}
		}
	)
		.then((response) => response.json())
		.then((verse) => {
			const data = verse.data;
			return data;
		})
		.catch((err) => {
			console.log(err);
		});

	const verse = res;

	return {
		verse: verse
	};
}
