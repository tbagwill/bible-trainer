import '$lib/supabaseClient'
import type { Handle, HandleServerError } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_KEY,
    event,
  })

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  }

  event.locals.getUser = async () => {
    const {
      data: { user },
    } = await event.locals.supabase.auth.getUser();
    return user;
  }

  if (event.url.pathname.startsWith(`${event.url.origin}/home`)) {
    const currSession = await event.locals.getSession()
    if( !currSession ) {
      redirect( 303, '/' );
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}

export const handleError: HandleServerError = async ({ error, event }) => {
  const errorId = crypto.randomUUID()
  return {
    errorId,
    message: 'Unknown error occurred.',
  }
}