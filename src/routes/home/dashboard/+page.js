import {
	PUBLIC_BIBLE_API_KEY,
	PUBLIC_RAPID_API_HOST_URL,
	PUBLIC_RAPID_API_KEY
} from '$env/static/public';
import { getVOTD } from '$lib/data/votd';

export async function load({ fetch, parent }) {
	await parent();
	const votd = getVOTD();

	const res = await fetch(
		`https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/verses/${votd}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`,
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

	console.log( verse );

	const dev = await fetch(`https://${PUBLIC_RAPID_API_HOST_URL}/verse/${verse.reference}`, {
		headers: {
			'X-RapidAPI-Key': PUBLIC_RAPID_API_KEY,
			'X-RapidAPI-Host': PUBLIC_RAPID_API_HOST_URL
		}
	});

	const result = await dev.json();
	const devotional = result.results;

	return {
		verse: verse,
		devotional: devotional
	};
}
