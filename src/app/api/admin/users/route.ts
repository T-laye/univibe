import { NextResponse } from 'next/server'
import { requireRole, toApiErrorResponse } from '@/lib/api-auth'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    await requireRole(request, ['admin'])
    const supabase = createSupabaseAdminClient()

    const [{ data: users, error: usersError }, { data: events, error: eventsError }] = await Promise.all([
      supabase.from('users').select('*').order('created_at', { ascending: false }),
      supabase.from('events').select('id, host_id'),
    ])

    if (usersError || eventsError) {
      return NextResponse.json({ error: usersError?.message ?? eventsError?.message ?? 'Unable to fetch users' }, { status: 400 })
    }

    return NextResponse.json(
      (users ?? []).map((user) => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
        university: user.university,
        role: user.role,
        kycStatus: user.kyc_status,
        joinDate: user.created_at,
        events: (events ?? []).filter((event) => event.host_id === user.id).length,
        kycDocument: user.kyc_document_url,
      }))
    )
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
