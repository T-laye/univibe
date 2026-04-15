import { NextResponse } from 'next/server'
import { getAuthenticatedProfile, toApiErrorResponse } from '@/lib/api-auth'
import { createSupabaseAdminClient, mapProfileToAuthUser } from '@/lib/supabase'
import { updateProfileSchema } from '@/lib/validations/auth'

export async function PATCH(request: Request) {
  try {
    const profile = await getAuthenticatedProfile(request)
    const payload = updateProfileSchema.parse(await request.json())
    const supabase = createSupabaseAdminClient()

    const { data: updated, error } = await supabase
      .from('users')
      .update({
        full_name: payload.fullName,
        university: payload.university,
        avatar_url: payload.avatarUrl ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id)
      .select('*')
      .single()

    if (error || !updated) {
      return NextResponse.json({ error: error?.message ?? 'Unable to update profile' }, { status: 400 })
    }

    return NextResponse.json({
      session: null,
      user: mapProfileToAuthUser(updated),
    })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
