import { NextResponse } from 'next/server'
import { getAuthenticatedProfile, toApiErrorResponse } from '@/lib/api-auth'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get('Authorization')
    const accessToken = authorization?.replace('Bearer ', '')
    const profile = await getAuthenticatedProfile(request)
    const supabase = createSupabaseServerClient(accessToken)
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return NextResponse.json({
      session,
      user: profile,
    })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
