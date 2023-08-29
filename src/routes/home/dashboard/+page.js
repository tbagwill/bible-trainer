import { PUBLIC_BIBLE_API_KEY } from '$env/static/public';
import { getVOTD } from '$lib/data/votd';

export async function load({ parent }) {
	await parent();
	const votd = getVOTD();

	const res = await fetch(
		`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${votd}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`,
		{
			headers: {
				'api-key': PUBLIC_BIBLE_API_KEY
			}
		}
	)
		.then((response) => response.json())
		.then((votd) => {
			const data = votd.data;
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
