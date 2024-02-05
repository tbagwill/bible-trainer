import { redirect, type Actions, fail } from "@sveltejs/kit";
import { verifyEmailSchema } from "$lib/data/validSchemas";
import { superValidate } from "sveltekit-superforms/server";

export const load = async ( ) => {
    const verifyForm = await superValidate( verifyEmailSchema )
    return verifyForm
  }

export const actions: Actions = {
    verify: async ({ request, cookies, url, locals }) => {
        // receive form data
        const verifyForm = await superValidate(request, verifyEmailSchema);
        const email = cookies.get('email')

        console.log( 'form received: ', verifyForm)

        // if form is invalid, return fail
        if( !verifyForm.valid ) return fail( 400, { verifyForm } )

        const { data: verify, error: err } = await locals.supabase
            .auth
            .verifyOtp({
                email: email as string,
                token: verifyForm.data.token,
                type: "email",
                options: { redirectTo: `${url.origin}/home/dashboard`}
            });

        if( err ){
            // console.error( 'error verifying: ', err )
            return fail( 400, { invalid: true  })
        } else {
            console.log( 'successfully verified: ', verify )
            redirect(300, `${url.origin}/home/dashboard`);
        }
    }
};