import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { createAccountSchema, loginSchema } from "$lib/data/validSchemas";

export const load = async ( ) => {
  const signupForm = await superValidate( createAccountSchema )
  const loginForm = await superValidate( loginSchema )
  return {
    signupForm,
    loginForm
  }
}

export const actions: Actions = {

    signup: async ({ request, cookies, locals, url }) => {
      // receive form data
      const signupForm = await superValidate(request, createAccountSchema);
      // default text version is King James Version
      const defaultVersion = 'de4e12af7f28f599-01'
      
      console.log( 'signupForm:', signupForm )
      
      // if form is invalid, return fail
      if (!signupForm.valid) return fail( 400, { signupForm } );

      // if form is valid, sign up user
      const { data: user, error: err } = await locals.supabase
        .auth.signUp(
          {
            email: signupForm.data.email,
            password: signupForm.data.password,
            options: {
              data: {
                username: signupForm.data.username,
                name: signupForm.data.name,
                version: defaultVersion
              },
              emailRedirectTo: `${url.origin}/confirm`
            }
          }
        )
        
        // if error signing up, fail
        if ( err ) {
          console.error( 'error signing up: ', err )
          return fail( 400, { err, invalid: true } )
        } 
        
        // if user data is returned successfully, redirect to email confirm
        if ( user ) {
          cookies.set('email', signupForm.data.email )
          console.log( 'sign up successful, user: ', user)
          throw redirect( 300, `${url.origin}/confirm`)
      }
    },

    login: async ({ request, locals, url }) => {
      // receive form data
      const loginForm = await superValidate(request, loginSchema);
      
      console.log( 'loginForm:', loginForm )

      // if form is invalid, return fail
      if (!loginForm.valid) return fail(400, { loginForm });

      const { data: user, error: err } = await locals.supabase
        .auth.signInWithPassword({
          email: loginForm.data.email,
          password: loginForm.data.password
        })

        if( err ) {
          console.error('error logging in: ', err )
          return fail( 400, { loginForm, invalid: true })
        }

        if( user ) {
          console.log( 'sign in successful, user: ', user)
          throw redirect( 300, `${url.origin}/home/dashboard`)
        }
    }
  };