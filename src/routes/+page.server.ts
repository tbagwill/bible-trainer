import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, cookies, url, locals: { supabase } }) => {
      const formData = await request.formData()
      const email = formData.get('email');

      cookies.set('email', email as string);

      const { error: err } = await supabase.auth.signInWithOtp({
        email: email as string,
        options: {
          emailRedirectTo: `${url.origin}/auth/callback`
        }
      });

      if (err) {
        if( err instanceof AuthApiError && err.status === 400 ) { 
          return fail(400, {
                error: 'Invalid email or password.'
            })
        }
        return fail(500, {
            error: 'Server error. Please try again later.'
        })
      };

      throw redirect( 303, '/confirm');
    } 
  };