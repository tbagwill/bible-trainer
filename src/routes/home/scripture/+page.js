import { PUBLIC_BIBLE_API_KEY } from "$env/static/public";
import { userPref } from "$lib/stores/userStore";

export async function load({ fetch, parent }) {
    await parent()
    const preferred = userPref.preferred_bible_version

    const res = await fetch( 
        `https://api.scripture.api.bible/v1/bibles/${preferred}/books`, 
        {
            headers: {
                'api-key': PUBLIC_BIBLE_API_KEY
            }
        })
        .then( ( response )  => response.json() )
        .then( ( books ) => {
            const data = books.data
            return data
        }).catch( (err) => {
            console.log( err );
        } )

        const books = res;

        return {
            books: books
        }
} 