/** @type {import('./$types').Actions} */
import { PUBLIC_BIBLE_API_KEY } from "$env/static/public";
import { userPref } from "$lib/stores/userStore";

export async function load ({ fetch, locals, parent }) {
    await parent()
    const res = await fetch( 
        `https://api.scripture.api.bible/v1/bibles?language=eng`,
        {
            headers: {
                'api-key': PUBLIC_BIBLE_API_KEY
            }
        })
        .then( ( response ) => response.json() )
        .then( ( versions ) => {
            const data = versions.data
            return data
        }).catch( ( err ) => {
            console.log( err );
        })

    const versions = res 

    return {
        versions: versions
    }

}

    export const actions = {
        updatePreferences: async ({ request, locals }) => {
            const session = await locals.getSession()
            const user = session.user.id
            
            const formData = await request.formData()
            console.log( 'form data received', formData)
            const userImage = formData.get('avatar') 
            console.log( 'img info', userImage )
            // const userName = formData.get('name') ?? null
            // const bibleVersion = formData.get('version') ?? userPref.preferred_bible_version
            

            // update name and version
            // const { data, error: err } = await locals.supabase.from('users_data')
            // .update({
            //     preferred_bible_version: bibleVersion.toString(),
            //     name: userName
            // })
            // .eq(
            //     'id', user
            // )
            // .select()

            // if they uploaded an image
            if( userImage ){
                    const { data, error: err } = await locals.supabase.storage
                        .from('avatars')
                        .upload(`${user}/avatar.png`, userImage, {
                            cacheControl: '60',
                            upsert: true,
                            contentType: 'image/png'
                        })

                    console.error( 'step 2 ', err )
                    console.log( data )
                }
            
            if( err ){
                console.error( err )
            }

        }
    };