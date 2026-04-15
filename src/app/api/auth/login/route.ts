import { NextResponse } from 'next/server'
import { createSupabaseServerClient, mapProfileToAuthUser } from '@/lib/supabase'
import { signInSchema } from '@/lib/validations/auth'

export async function POST(request: Request) {
  try {
    const payload = signInSchema.parse(await request.json())
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    })

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message ?? 'Invalid credentials' }, { status: 401 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    return NextResponse.json({
      session: data.session,
      user: mapProfileToAuthUser(profile),
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid sign in payload' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
