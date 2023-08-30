import { PUBLIC_BIBLE_API_KEY } from '$env/static/public';

export async function load({ params, parent }) {
	await parent();

	const res = await fetch(
		`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/${params.chapterId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`,
		{
			headers: {
				'api-key': PUBLIC_BIBLE_API_KEY
			}
		}
	)
		.then((response) => response.json())
		.then((verses) => {
			const data = verses.data;
			return data;
		})
		.catch((err) => {
			console.log(err);
		});

	const vres = await fetch(
		`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/${params.chapterId}/verses`,
		{
			headers: {
				'api-key': PUBLIC_BIBLE_API_KEY
			}
		}
	)
		.then((response) => response.json())
		.then((verses) => {
			const data = verses.data;
			return data;
		})
		.catch((err) => {
			console.log(err);
		});

	const chapter = res;

	const verses = vres;

	return {
		chapter: chapter,
		verses: verses
	};
}
