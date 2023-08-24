import { PUBLIC_BIBLE_API_KEY } from "$env/static/public";
import { userPref } from "$lib/stores/userStore";

export async function load({ params, parent }) {
    await parent()
    const preferred = userPref.preferred_bible_version

    const res = await fetch( 
        `https://api.scripture.api.bible/v1/bibles/${preferred}/chapters/${params.chapterId}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false`, 
        {
            headers: {
                'api-key': PUBLIC_BIBLE_API_KEY
            }
        })
        .then( ( response )  => response.json() )
        .then( ( verses ) => {
            const data = verses.data
            return data
        }).catch( (err) => {
            console.log( err );
        } );

    const vres = await fetch( 
        `https://api.scripture.api.bible/v1/bibles/${preferred}/chapters/${params.chapterId}/verses`, 
        {
            headers: {
                'api-key': PUBLIC_BIBLE_API_KEY
            }
        })
        .then( ( response )  => response.json() )
        .then( ( verses ) => {
            const data = verses.data
            return data
        }).catch( (err) => {
            console.log( err );
        } );

        const chapter = res;

        const verses = vres;
        console.log( verses )

        return {
            chapter: chapter,
            verses: verses
        }
}