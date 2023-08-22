import { PUBLIC_BIBLE_API_KEY } from "$env/static/public";
/** @type {import('./$types').PageLoad} */

export async function load({ params }) {
    const res = await fetch(
        `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${params.verseId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`,
        {
            headers: {
                'api-key': PUBLIC_BIBLE_API_KEY,
            }
        })
        .then( ( response )  => response.json() )
        .then( ( verse ) => {
            const data = verse.data
            return data
        }).catch( (err) => {
            console.log( err );
        } )

        const verse = res;

        return {
            verse: verse
        }
}