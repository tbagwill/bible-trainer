import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    verify: async ({ request, cookies, url, locals: { supabase } }) => {
        const formData = await request.formData();
        const token = formData.get('token');
        const email = cookies.get('email');

        const { data, error: err } = await supabase.auth.verifyOtp({
            email: email as string,
            token: token as string,
            type: "email",
            options: { redirectTo: `${url.origin}/home/dashboard`}
        });

        if(err){
            throw new Error('Uh oh!')
        } else {
            throw redirect(300, `${url.origin}/home/dashboard`)
        }
    }
};